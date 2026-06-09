/**
 * Fully resilient, elite patch to prevent "Uncaught TypeError: Cannot set property fetch of #<Window> which has only a getter"
 * 
 * This happens inside certain sandboxed iframe environments where `fetch` is defined as a getter-only property 
 * on the prototype chain of global objects (e.g., `Window.prototype`). Since standard property assignment 
 * (e.g., `window.fetch = ...`) cannot shadow a read-only property on parent prototypes, third-party libraries 
 * (e.g., formdata-polyfill, stripe, mock-service-worker, etc.) fail with a fatal TypeError.
 * 
 * To solve this permanently, we recursively traverse the prototype chain of `globalThis`, `window`, and `self`, 
 * and replace any configurable properties named 'fetch' with a robust custom getter/setter.
 */
(() => {
  let currentFetch: typeof fetch | undefined = undefined;

  // 1. Safely capture the original browser fetch function
  try {
    if (typeof fetch !== 'undefined') {
      currentFetch = fetch;
    } else if (typeof globalThis !== 'undefined' && 'fetch' in globalThis) {
      currentFetch = (globalThis as any).fetch;
    } else if (typeof window !== 'undefined' && 'fetch' in window) {
      currentFetch = (window as any).fetch;
    }
  } catch (e) {
    // Ignore capture failure
  }

  // 2. Define our custom getter/setter descriptor
  const getterSetterDescriptor = {
    configurable: true,
    enumerable: true,
    get() {
      return currentFetch;
    },
    set(val: any) {
      currentFetch = val;
    }
  };

  // 3. Helper to patch a target object
  const patchTarget = (targetObj: any) => {
    if (!targetObj) return;
    try {
      const desc = Object.getOwnPropertyDescriptor(targetObj, 'fetch');
      if (desc && desc.configurable === false) {
        // If it is absolutely non-configurable, we can't redefine it.
        return;
      }
      Object.defineProperty(targetObj, 'fetch', getterSetterDescriptor);
    } catch (err) {
      // Ignore failures per target
    }
  };

  // 4. Prototype chain crawler to apply the patch at all inheritance levels
  const patchPrototypeChain = (startObj: any) => {
    if (!startObj) return;
    let obj = startObj;
    // Walk the prototype chain up to Object.prototype
    while (obj && obj !== Object.prototype) {
      patchTarget(obj);
      try {
        obj = Object.getPrototypeOf(obj);
      } catch (e) {
        break;
      }
    }
  };

  // 5. Gather all global accessors and trigger recursive patching
  try {
    if (typeof globalThis !== 'undefined') {
      patchPrototypeChain(globalThis);
    }
  } catch (e) {}

  try {
    if (typeof window !== 'undefined') {
      patchPrototypeChain(window);
    }
  } catch (e) {}

  try {
    if (typeof self !== 'undefined') {
      patchPrototypeChain(self);
    }
  } catch (e) {}

  try {
    const globalVar = (globalThis as any).global;
    if (globalVar) {
      patchPrototypeChain(globalVar);
    }
  } catch (e) {}

  try {
    if (typeof Window !== 'undefined' && Window.prototype) {
      patchPrototypeChain(Window.prototype);
    }
  } catch (e) {}
})();
