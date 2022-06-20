(()=>{"use strict";var e={913:()=>{try{self["workbox:core:6.5.2"]&&_()}catch(e){}},977:()=>{try{self["workbox:precaching:6.5.2"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:6.5.2"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:6.5.2"]&&_()}catch(e){}}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,s),r.exports}(()=>{s(913);class e extends Error{constructor(e,t){super(((e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s})(e,t)),this.name=e,this.details=t}}const t={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},a=e=>[t.prefix,e,t.suffix].filter((e=>e&&e.length>0)).join("-"),n=e=>e||a(t.precache);function r(e,t){const s=t();return e.waitUntil(s),s}function i(t){if(!t)throw new e("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:s,url:a}=t;if(!a)throw new e("add-to-cache-list-unexpected-type",{entry:t});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),r=new URL(a,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:r.href}}s(977);class c{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class o{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}let h;function l(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class u{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const d=new Set;function f(e){return"string"==typeof e?new Request(e):e}s(873);class p{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new u,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(t){const{event:s}=this;let a=f(t);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(t){if(t instanceof Error)throw new e("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const r=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:r,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:r.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=f(e);let s;const{cacheName:a,matchOptions:n}=this._strategy,r=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},n),{cacheName:a});s=await caches.match(r,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:a,matchOptions:n,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(t,s){const a=f(t);await(0,new Promise((e=>setTimeout(e,0))));const n=await this.getCacheKey(a,"write");if(!s)throw new e("cache-put-with-no-response",{url:(r=n.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const i=await this._ensureResponseSafeToCache(s);if(!i)return!1;const{cacheName:c,matchOptions:o}=this._strategy,h=await self.caches.open(c),u=this.hasCallback("cacheDidUpdate"),p=u?await async function(e,t,s,a){const n=l(t.url,s);if(t.url===n)return e.match(t,a);const r=Object.assign(Object.assign({},a),{ignoreSearch:!0}),i=await e.keys(t,r);for(const t of i)if(n===l(t.url,s))return e.match(t,a)}(h,n.clone(),["__WB_REVISION__"],o):null;try{await h.put(n,u?i.clone():i)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of d)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:c,oldResponse:p,newResponse:i.clone(),request:n,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let a=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))a=f(await e({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[s]=a}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const n=Object.assign(Object.assign({},a),{state:s});return t[e](n)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class g extends class{constructor(e={}){this.cacheName=e.cacheName||a(t.runtime),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,n=new p(this,{event:t,request:s,params:a}),r=this._getResponse(n,s,t);return[r,this._awaitComplete(r,n,s,t)]}async _getResponse(t,s,a){let n;await t.runCallbacks("handlerWillStart",{event:a,request:s});try{if(n=await this._handle(s,t),!n||"error"===n.type)throw new e("no-response",{url:s.url})}catch(e){if(e instanceof Error)for(const r of t.iterateCallbacks("handlerDidError"))if(n=await r({error:e,event:a,request:s}),n)break;if(!n)throw e}for(const e of t.iterateCallbacks("handlerWillRespond"))n=await e({event:a,request:s,response:n});return n}async _awaitComplete(e,t,s,a){let n,r;try{n=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:n}),await t.doneWaiting()}catch(e){e instanceof Error&&(r=e)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:n,error:r}),t.destroy(),r)throw r}}{constructor(e={}){e.cacheName=n(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(g.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){return await t.cacheMatch(e)||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(t,s){let a;const n=s.params||{};if(!this._fallbackToNetwork)throw new e("missing-precache-entry",{cacheName:this.cacheName,url:t.url});{const e=n.integrity,r=t.integrity,i=!r||r===e;a=await s.fetch(new Request(t,{integrity:r||e})),e&&i&&(this._useDefaultCacheabilityPluginIfNeeded(),await s.cachePut(t,a.clone()))}return a}async _handleInstall(t,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(t);if(!await s.cachePut(t,a.clone()))throw new e("bad-precaching-response",{url:t.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==g.copyRedirectedCacheableResponsesPlugin&&(a===g.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(g.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}g.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},g.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await async function(t,s){let a=null;if(t.url&&(a=new URL(t.url).origin),a!==self.location.origin)throw new e("cross-origin-copy-response",{origin:a});const n=t.clone(),r={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},i=s?s(r):r,c=function(){if(void 0===h){const e=new Response("");if("body"in e)try{new Response(e.body),h=!0}catch(e){h=!1}h=!1}return h}()?n.body:await n.blob();return new Response(c,i)}(t):t};class y{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new g({cacheName:n(e),plugins:[...t,new o({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(t){const s=[];for(const a of t){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:t,url:n}=i(a),r="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==t)throw new e("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:t});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(t)&&this._cacheKeysToIntegrities.get(t)!==a.integrity)throw new e("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(t,a.integrity)}if(this._urlsToCacheKeys.set(n,t),this._urlsToCacheModes.set(n,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return r(e,(async()=>{const t=new c;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(s),n=this._urlsToCacheModes.get(t),r=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}}))}activate(e){return r(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(t){const s=this.getCacheKeyForURL(t);if(!s)throw new e("non-precached-url",{url:t});return e=>(e.request=new Request(t),e.params=Object.assign({cacheKey:s},e.params),this.strategy.handle(e))}}let w;const m=()=>(w||(w=new y),w);s(80);const _=e=>e&&"object"==typeof e?e:{handle:e};class R{constructor(e,t,s="GET"){this.handler=_(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=_(e)}}class v extends R{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class C{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const a=s.origin===location.origin,{params:n,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:a,url:s});let i=r&&r.handler;const c=e.method;if(!i&&this._defaultHandlerMap.has(c)&&(i=this._defaultHandlerMap.get(c)),!i)return;let o;try{o=i.handle({url:s,request:e,event:t,params:n})}catch(e){o=Promise.reject(e)}const h=r&&r.catchHandler;return o instanceof Promise&&(this._catchHandler||h)&&(o=o.catch((async a=>{if(h)try{return await h.handle({url:s,request:e,event:t,params:n})}catch(e){e instanceof Error&&(a=e)}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw a}))),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:a}){const n=this._routes.get(s.method)||[];for(const r of n){let n;const i=r.match({url:e,sameOrigin:t,request:s,event:a});if(i)return n=i,(Array.isArray(n)&&0===n.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(n=void 0),{route:r,params:n}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,_(e))}setCatchHandler(e){this._catchHandler=_(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(t){if(!this._routes.has(t.method))throw new e("unregister-route-but-not-found-with-method",{method:t.method});const s=this._routes.get(t.method).indexOf(t);if(!(s>-1))throw new e("unregister-route-route-not-registered");this._routes.get(t.method).splice(s,1)}}let b;class q extends R{constructor(e,t){super((({request:s})=>{const a=e.getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:a=!0,urlManipulation:n}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(a){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(n){const e=n({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=a.get(n);if(t)return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}),e.strategy)}}var U;U=[{'revision':'f0ecac6da7b60bcae97f27669478aa87','url':'assets/artifacts/artifact_four.html'},{'revision':'ec57956c56e6a4f28691dac7e7d5bc55','url':'assets/artifacts/artifact_one.html'},{'revision':'246e435cbd60af19fbac65cd2b8f2c2f','url':'assets/artifacts/artifact_three.html'},{'revision':'2228530afa31b799b38ef2cc237c7828','url':'assets/artifacts/artifact_two.html'},{'revision':'faed5490c8e5a575f5a57a85685a6982','url':'assets/artifacts/img/background.png'},{'revision':'b8547decb7807ea6e9b7275b286380ce','url':'assets/audio/idioms/a_boy_the_kid.mp3'},{'revision':'a8d3a79d68b95ca3a5e4febdf963c6a2','url':'assets/audio/idioms/a_boy_the_kid.ogg'},{'revision':'13a5dbd95f2da50349d765437b0f6818','url':'assets/audio/idioms/come_here_i_want_ya.mp3'},{'revision':'41e9fdc2083366080dc576a51b5c2bf9','url':'assets/audio/idioms/come_here_i_want_ya.ogg'},{'revision':'0e06c1b38db4def3a3623c62845829d3','url':'assets/audio/idioms/copper_pipe.mp3'},{'revision':'be2d149552c63835296045792b4c1448','url':'assets/audio/idioms/copper_pipe.ogg'},{'revision':'be5cd54b829e91f568ffb0f6dcd731fe','url':'assets/audio/idioms/decent.mp3'},{'revision':'378b0aac6de635d000b5c98776c95602','url':'assets/audio/idioms/decent.ogg'},{'revision':'67fc4e102f0f3d0efd9627c4f4c324a3','url':'assets/audio/idioms/dose.mp3'},{'revision':'63b3ffd73d1144ff734e32cf8141db28','url':'assets/audio/idioms/dose.ogg'},{'revision':'46725ed495b1121cad39aa4bc1e945e7','url':'assets/audio/idioms/gawke.mp3'},{'revision':'f431f84223fe8c4bc9e6c41ccd88365e','url':'assets/audio/idioms/gawke.ogg'},{'revision':'b482d8d4dda233200898d8159b47444c','url':'assets/audio/idioms/head_like_a_chewed_toffee.mp3'},{'revision':'20220fea1d20f238a6abc0e9ffcaa80e','url':'assets/audio/idioms/head_like_a_chewed_toffee.ogg'},{'revision':'ff112eea63dd7033f531575f1415fa90','url':'assets/audio/idioms/mup.mp3'},{'revision':'aca223203ab1a215edc237bd81c65963','url':'assets/audio/idioms/mup.ogg'},{'revision':'7d92db57c3ac82b3c7b094e9a9306495','url':'assets/audio/idioms/sca.mp3'},{'revision':'c95915e5f2a2c12de649dceab90e3c7f','url':'assets/audio/idioms/sca.ogg'},{'revision':'10324ec36bde9b75de9b6012ad93e03e','url':'assets/audio/idioms/shades.mp3'},{'revision':'aaf529d3a8d5434e8ac5859f4dc7730c','url':'assets/audio/idioms/shades.ogg'},{'revision':'2d3fa27ee152629e1c9a17bc354956e5','url':'assets/audio/idioms/sham.mp3'},{'revision':'aa0b2fa7b167b44fdc68db846c89792f','url':'assets/audio/idioms/sham.ogg'},{'revision':'85e5d85713e2b8342dce7c6f8259f0b1','url':'assets/audio/idioms/silent.mp3'},{'revision':'0336fb6ef408a38ccc0cda74769c84d5','url':'assets/audio/idioms/silent.ogg'},{'revision':'86e78a11e37328844ff5b4733a318dbc','url':'assets/audio/idioms/state_of_ya.mp3'},{'revision':'b3def059c136bde75d90341cff944980','url':'assets/audio/idioms/state_of_ya.ogg'},{'revision':'6be26695407fe93dee8359029fb2d016','url':'assets/audio/idioms/story.mp3'},{'revision':'de235a3f4b064298df246c4dcd5df048','url':'assets/audio/idioms/story.ogg'},{'revision':'29c27f308eec226055253075cba02ce9','url':'assets/audio/idioms/tackies.mp3'},{'revision':'cc59c78f9df74cc188712f1b67af229e','url':'assets/audio/idioms/tackies.ogg'},{'revision':'11892d0b16533e580c6498af90fa0b75','url':'assets/audio/idioms/took_a_hopper.mp3'},{'revision':'c7c93ed4c0a34abe4c84d6cdb6e9a08b','url':'assets/audio/idioms/took_a_hopper.ogg'},{'revision':'78c795b839bb08bc18b9d2803a77afc7','url':'assets/audio/idioms/unreal.mp3'},{'revision':'6e3ff266fa887fe258931d520dee2d5c','url':'assets/audio/idioms/unreal.ogg'},{'revision':'d00d7d28487741be182d6d74678e2d89','url':'assets/audio/idioms/well_boi_whats_the_craic.mp3'},{'revision':'bcee4f534b978033165d0aa024e8b915','url':'assets/audio/idioms/well_boi_whats_the_craic.ogg'},{'revision':'5360b7336091278668d993cede30c1c8','url':'assets/audio/idioms/well_kid.mp3'},{'revision':'cdce72293ec877cc207e305d06279bd3','url':'assets/audio/idioms/well_kid.ogg'},{'revision':'fbc4db083d455834a06ce869fc760411','url':'assets/audio/idioms/well_sham_any_sca.mp3'},{'revision':'9375eff4baeeedb62ac9ae59adfd110c','url':'assets/audio/idioms/well_sham_any_sca.ogg'},{'revision':'5334271a5b969289037dbe10925fcdd0','url':'assets/audio/idioms/yurt.mp3'},{'revision':'01270d2ae01073c3f50f32db3b539451','url':'assets/audio/idioms/yurt.ogg'},{'revision':'e349392099da8ac0fa03a197582cd2ac','url':'assets/audio/level/church_bells.mp3'},{'revision':'a3c9c5e9ad72413f6b0115feb882ebc8','url':'assets/audio/level/church_bells.ogg'},{'revision':'1de60592cd6b7818f4c903ee7c3648d3','url':'assets/audio/level/level_backing_track.mp3'},{'revision':'41fc68291e37b871ed66e36c48699d6c','url':'assets/audio/level/level_backing_track.ogg'},{'revision':'26b520f26ce3ccae913465e6d95c67a6','url':'assets/audio/level/punish_one.mp3'},{'revision':'0c4e6e41ecbd1582588105c416c5257b','url':'assets/audio/level/punish_one.ogg'},{'revision':'ddac73a06dd6ec7a07de327f6138d4a7','url':'assets/audio/level/punish_two.mp3'},{'revision':'7f66712f99b1f7d4d46a8ccdd9729563','url':'assets/audio/level/punish_two.ogg'},{'revision':'8a19f0120e4fde06e7923782f46b876d','url':'assets/audio/level/reached_goal.mp3'},{'revision':'5a850bae85380aa4079c17efbeb8a834','url':'assets/audio/level/reached_goal.ogg'},{'revision':'8a19f0120e4fde06e7923782f46b876d','url':'assets/audio/level/revived.mp3'},{'revision':'5a850bae85380aa4079c17efbeb8a834','url':'assets/audio/level/revived.ogg'},{'revision':'8a19f0120e4fde06e7923782f46b876d','url':'assets/audio/level/reward.mp3'},{'revision':'5a850bae85380aa4079c17efbeb8a834','url':'assets/audio/level/reward.ogg'},{'revision':'ddac73a06dd6ec7a07de327f6138d4a7','url':'assets/audio/level/under_attack.mp3'},{'revision':'7f66712f99b1f7d4d46a8ccdd9729563','url':'assets/audio/level/under_attack.ogg'},{'revision':'ae9794bc8fb334972ea06446c94332b9','url':'assets/audio/splash/splash_screen_track.mp3'},{'revision':'ece1da46aeb65fd9b7a12bef0a72a538','url':'assets/audio/splash/splash_screen_track.ogg'},{'revision':'3ae9ae2af2598a11adbe99cbfeaec0e9','url':'assets/credits/credits.html'},{'revision':'dbe79ed152a15f6742f2fc0796250cc7','url':'assets/fonts/LondrinaShadow-Regular.ttf'},{'revision':'1c1fcee33871200c6cc86380fff37438','url':'assets/fonts/LondrinaSolid-Black.ttf'},{'revision':'d41d8cd98f00b204e9800998ecf8427e','url':'assets/img/collectables/test.txt'},{'revision':'09b4ac6c113608c5cd865ad1f0daeb7a','url':'assets/level/hud.png'},{'revision':'4dfbad0a2cda714dd0a786c5c9472dd8','url':'assets/level/truffles_level_1.json'},{'revision':'5337d4fa303753d107c2f500c3eb743d','url':'assets/level/truffles_level_1_tileset.png'},{'revision':'5b964cbe8494894b706792c896717d58','url':'assets/logos/LCGA.png'},{'revision':'738895f83053033bcfbbddb897876832','url':'assets/logos/SETU_Ireland_computing.png'},{'revision':'98f19749dd7447c924dd6bf31c8968cb','url':'assets/logos/SETU_Ireland_logo.png'},{'revision':'c024de113b4b38ba3e140db7ae20af77','url':'assets/logos/limerick_city.png'},{'revision':'bfe891c1fb445e82b1a863223e9f2dde','url':'assets/logos/limerick_gallery_of_art.png'},{'revision':'26942721b77bdfe04bb6541f5a198987','url':'assets/logos/limerick_museum.png'},{'revision':'007d9918244e7e335141841c0d2ef196','url':'assets/logos/the_hunt_museum.png'},{'revision':'14bc36edd6fde2b66630a1a2d92bcf80','url':'assets/spine/cannonball/cannonball.atlas'},{'revision':'9937ed47ef447ebbda3c789ef5f30949','url':'assets/spine/cannonball/cannonball.json'},{'revision':'ac407b4fadd1853cca1d3019eb9b9ba0','url':'assets/spine/cannonball/cannonball.png'},{'revision':'4d33f488807e41c39f786d9b357d5a63','url':'assets/spine/collectibles_ui/alter/alter.atlas'},{'revision':'cf290cefc056874446360cf9f84b3858','url':'assets/spine/collectibles_ui/alter/alter.json'},{'revision':'260b7937c66b5f4a1648a502363ef91a','url':'assets/spine/collectibles_ui/alter/alter.png'},{'revision':'a34302feb33220ec075f475bd0d0ca98','url':'assets/spine/collectibles_ui/pig/pig.atlas'},{'revision':'e6be14dc1a4bcea5f6953ffbc6df5ed3','url':'assets/spine/collectibles_ui/pig/pig.json'},{'revision':'260b7937c66b5f4a1648a502363ef91a','url':'assets/spine/collectibles_ui/pig/pig.png'},{'revision':'5b7aed63ed861b323a8be3331517f680','url':'assets/spine/collectibles_ui/pot/pot.atlas'},{'revision':'df67a0a34ac80fc8dd732b4d7a88a57d','url':'assets/spine/collectibles_ui/pot/pot.json'},{'revision':'260b7937c66b5f4a1648a502363ef91a','url':'assets/spine/collectibles_ui/pot/pot.png'},{'revision':'35de7631bf7c1fa4fc737cd79ec962f6','url':'assets/spine/collectibles_ui/vase/vase.atlas'},{'revision':'72754a7f9fab69a38da80cfc58f66197','url':'assets/spine/collectibles_ui/vase/vase.json'},{'revision':'260b7937c66b5f4a1648a502363ef91a','url':'assets/spine/collectibles_ui/vase/vase.png'},{'revision':'4e87a715ab42eaff425348a89a67f14b','url':'assets/spine/diver/diver.atlas'},{'revision':'5f6702ff700a177fd7012075c845fbd1','url':'assets/spine/diver/diver.json'},{'revision':'2bd20ddc76d0d00e9bae7b38b61e34f0','url':'assets/spine/diver/diver.png'},{'revision':'91630b4ddf5cf60d03504df3baf028ac','url':'assets/spine/dpad/DPad.atlas'},{'revision':'a03908f80fad4a52c18181b0d1656ffe','url':'assets/spine/dpad/DPad.json'},{'revision':'d2950b7ea1867f14a21eab71057f307b','url':'assets/spine/dpad/DPad.png'},{'revision':'450d614a9115eb99e088835853543a02','url':'assets/spine/fish/fish.atlas'},{'revision':'cfcda7629c1b3aef5ba53be0c7473e5d','url':'assets/spine/fish/fish.json'},{'revision':'6740db08c219ea464e8d6b680f6008c5','url':'assets/spine/fish/fish.png'},{'revision':'d66ca919cf81e32d352c194dd573ef75','url':'assets/spine/flag/flag.atlas'},{'revision':'fbe883c1256fb65cd377364006f8d2c7','url':'assets/spine/flag/flag.json'},{'revision':'d37f9770dfe48e9196622dc1aca550df','url':'assets/spine/flag/flag.png'},{'revision':'5e265f6781b6278211796270f7a7ab48','url':'assets/spine/fruits/grape/grape.atlas'},{'revision':'1b6a681f1e77a8e3e25e1ca2e27e3f04','url':'assets/spine/fruits/grape/grape.json'},{'revision':'209ad49edbe297ad70a9bcb98ffcb0a9','url':'assets/spine/fruits/grape/grape.png'},{'revision':'3309998cba6c934950b9716860e92fc6','url':'assets/spine/fruits/lemon/lemon.atlas'},{'revision':'535062e6c678ec4f42e6d1c171b95d32','url':'assets/spine/fruits/lemon/lemon.json'},{'revision':'514a0c739dbd77d39fe83091a617abf7','url':'assets/spine/fruits/lemon/lemon.png'},{'revision':'5db306fc5b76a0996cca21ea14b626cc','url':'assets/spine/fruits/orange/orange.atlas'},{'revision':'3995193207aaf64ac612b562049ee19b','url':'assets/spine/fruits/orange/orange.json'},{'revision':'ffe0d4b54497f2f7546bb49b41f80298','url':'assets/spine/fruits/orange/orange.png'},{'revision':'285b4ce868f9addbd2367af35b0624d0','url':'assets/spine/record/record.atlas'},{'revision':'394c92846891717b3d3d6cb6500bf07e','url':'assets/spine/record/record.json'},{'revision':'34e3d8053768b42027436a71514293f4','url':'assets/spine/record/record.png'},{'revision':'7d3c588f15c921c72261352c6f727e60','url':'assets/spine/sound/sound.atlas'},{'revision':'a7607726ba68cd1d441b0841615bee22','url':'assets/spine/sound/sound.json'},{'revision':'ecf88930d1f8ad740e5a606df8e7f16c','url':'assets/spine/sound/sound.png'},{'revision':'9d0632e09f2d0fc92d3bc279a1f763f9','url':'assets/spine/timer/timer.atlas'},{'revision':'23fa68afe99129f1c4fb60151b8b2745','url':'assets/spine/timer/timer.json'},{'revision':'825413702dbda9aa2c766e2c8b09dd87','url':'assets/spine/timer/timer.png'},{'revision':'e45a80751dd2d9c0b1d59e09d206671c','url':'assets/spine/truffles/truffles_all.atlas'},{'revision':'9133ee604f2344fd6404342248650c21','url':'assets/spine/truffles/truffles_all.json'},{'revision':'1d27bb6d6c0ad384beccb4bd6b3fc707','url':'assets/spine/truffles/truffles_all.png'},{'revision':'b694b6b76dc614190159d35e2fa1b1b5','url':'assets/spine/windmill/windmill.atlas'},{'revision':'596e8cb6a491c0d0d7382bbfaecc201d','url':'assets/spine/windmill/windmill.json'},{'revision':'9dbf17973a4728f603bd74571b8a201d','url':'assets/spine/windmill/windmill.png'},{'revision':'b582dfd74c73482a7268cdcea0084e5e','url':'assets/splash/splash.png'},{'revision':'a392cb0225b02a594ece22c07ce3b0ab','url':'favicon.ico'},{'revision':'5701336829bb7623557b57a6c4f23cbf','url':'icons/icons-192.png'},{'revision':'97d3357e14e7bfde5f0daa9591ada350','url':'icons/icons-512.png'},{'revision':'6223807d4a5f23f7c70657a72e1c4fa1','url':'index.html'},{'revision':null,'url':'main.2cf2fa930e9b9957a2cc.bundle.js'},{'revision':'bdac33727945c6c1782fb6c6867730f9','url':'manifest.json'},{'revision':null,'url':'vendors.db029ba031ffaba1f301.bundle.js'},{'revision':'997c4fd346851be760a6aa17b9c51f4f','url':'vendors.db029ba031ffaba1f301.bundle.js.LICENSE.txt'}],m().precache(U),function(t){const s=m();!function(t,s,a){let n;if("string"==typeof t){const e=new URL(t,location.href);n=new R((({url:t})=>t.href===e.href),s,a)}else if(t instanceof RegExp)n=new v(t,s,a);else if("function"==typeof t)n=new R(t,s,a);else{if(!(t instanceof R))throw new e("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=t}(b||(b=new C,b.addFetchListener(),b.addCacheListener()),b).registerRoute(n)}(new q(s,t))}(undefined)})()})();