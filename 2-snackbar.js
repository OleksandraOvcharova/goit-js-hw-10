import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{i}from"./assets/vendor-BbbuE1sJ.js";const a=document.querySelector(".form");a.addEventListener("submit",s=>{s.preventDefault();const o=new FormData(s.target),t=parseInt(o.get("delay")),r=o.get("state");console.log(r),new Promise((e,m)=>{setTimeout(()=>{r==="fulfilled"?e(t):m(t)},t)}).then(e=>i.show({message:`✅ Fulfilled promise in ${e}ms`})).catch(e=>i.error({message:`❌ Rejected promise in ${e}ms`}))});
//# sourceMappingURL=2-snackbar.js.map
