import{H as d,s as m}from"./index.e2645f4e.js";const u=[];function p(e,t=d){let n;const o=new Set;function a(s){if(m(e,s)&&(e=s,n)){const c=!u.length;for(const i of o)i[1](),u.push(i,e);if(c){for(let i=0;i<u.length;i+=2)u[i][0](u[i+1]);u.length=0}}}function l(s){a(s(e))}function r(s,c=d){const i=[s,c];return o.add(i),o.size===1&&(n=t(a)||d),s(e),()=>{o.delete(i),o.size===0&&n&&(n(),n=null)}}return{set:a,update:l,subscribe:r}}var g;const y=((g=globalThis.__sveltekit_cydvsp)==null?void 0:g.base)??"";var k;const E=((k=globalThis.__sveltekit_cydvsp)==null?void 0:k.assets)??y,S="1685027612987",T="sveltekit:snapshot",I="sveltekit:scroll",x="sveltekit:index",_={tap:1,hover:2,viewport:3,eager:4,off:-1};function O(e){let t=e.baseURI;if(!t){const n=e.getElementsByTagName("base");t=n.length?n[0].href:e.URL}return t}function U(){return{x:pageXOffset,y:pageYOffset}}function f(e,t){return e.getAttribute(`data-sveltekit-${t}`)}const b={..._,"":_.hover};function v(e){let t=e.assignedSlot??e.parentNode;return(t==null?void 0:t.nodeType)===11&&(t=t.host),t}function L(e,t){for(;e&&e!==t;){if(e.nodeName.toUpperCase()==="A"&&e.hasAttribute("href"))return e;e=v(e)}}function N(e,t){let n;try{n=new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI)}catch{}const o=e instanceof SVGAElement?e.target.baseVal:e.target,a=!n||!!o||A(n,t)||(e.getAttribute("rel")||"").split(/\s+/).includes("external"),l=(n==null?void 0:n.origin)===location.origin&&e.hasAttribute("download");return{url:n,external:a,target:o,download:l}}function P(e){let t=null,n=null,o=null,a=null,l=null,r=null,s=e;for(;s&&s!==document.documentElement;)o===null&&(o=f(s,"preload-code")),a===null&&(a=f(s,"preload-data")),t===null&&(t=f(s,"keepfocus")),n===null&&(n=f(s,"noscroll")),l===null&&(l=f(s,"reload")),r===null&&(r=f(s,"replacestate")),s=v(s);return{preload_code:b[o??"off"],preload_data:b[a??"off"],keep_focus:t==="off"?!1:t===""?!0:null,noscroll:n==="off"?!1:n===""?!0:null,reload:l==="off"?!1:l===""?!0:null,replace_state:r==="off"?!1:r===""?!0:null}}function h(e){const t=p(e);let n=!0;function o(){n=!0,t.update(r=>r)}function a(r){n=!1,t.set(r)}function l(r){let s;return t.subscribe(c=>{(s===void 0||n&&c!==s)&&r(s=c)})}return{notify:o,set:a,subscribe:l}}function w(){const{set:e,subscribe:t}=p(!1);let n;async function o(){clearTimeout(n);try{const a=await fetch(`${E}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!a.ok)return!1;const r=(await a.json()).version!==S;return r&&(e(!0),clearTimeout(n)),r}catch{return!1}}return{subscribe:t,check:o}}function A(e,t){return e.origin!==location.origin||!e.pathname.startsWith(t)}function V(e){e.client}const Y={url:h({}),page:h({}),navigating:p(null),updated:w()};export{x as I,_ as P,I as S,T as a,N as b,P as c,U as d,y as e,L as f,O as g,V as h,A as i,Y as s};
