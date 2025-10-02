import{r as u,j as i,$ as ne,K as fe,a as Aa,u as Ta,t as Ae}from"./app-CvMbTzME.js";import{u as L,S as Ie,a as B,c as C,d as Qn,h as er,e as Da,B as Bt}from"./createLucideIcon-GqUqBr6E.js";import{u as $e,c as me,g as re,P as S,a as x,o as z,J as ja,i as Ht,k as tr,m as nr,l as rr,F as or,D as Ut,e as ar,j as Je,d as Ze,R as sr,A as ir,K as Ma,C as cr,n as lr,h as Kt,q as Na}from"./index-DccZadBj.js";import{c as ur,R as Ra}from"./index-DVIw4Pa8.js";import{C as ka}from"./check-D0FagM7L.js";import{H as Sn,S as Oa}from"./search-DX376Xdh.js";import{S as Pa}from"./shield-BI0fgmpA.js";var Gt="Dialog",[dr,Ff]=me(Gt),[$a,U]=dr(Gt),fr=e=>{const{__scopeDialog:t,children:n,open:r,defaultOpen:o,onOpenChange:a,modal:s=!0}=e,c=u.useRef(null),l=u.useRef(null),[f=!1,d]=$e({prop:r,defaultProp:o,onChange:a});return i.jsx($a,{scope:t,triggerRef:c,contentRef:l,contentId:re(),titleId:re(),descriptionId:re(),open:f,onOpenChange:d,onOpenToggle:u.useCallback(()=>d(p=>!p),[d]),modal:s,children:n})};fr.displayName=Gt;var pr="DialogTrigger",hr=u.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=U(pr,n),a=L(t,o.triggerRef);return i.jsx(S.button,{type:"button","aria-haspopup":"dialog","aria-expanded":o.open,"aria-controls":o.contentId,"data-state":Wt(o.open),...r,ref:a,onClick:x(e.onClick,o.onOpenToggle)})});hr.displayName=pr;var Vt="DialogPortal",[Fa,gr]=dr(Vt,{forceMount:void 0}),mr=e=>{const{__scopeDialog:t,forceMount:n,children:r,container:o}=e,a=U(Vt,t);return i.jsx(Fa,{scope:t,forceMount:n,children:u.Children.map(r,s=>i.jsx(z,{present:n||a.open,children:i.jsx(Ht,{asChild:!0,container:o,children:s})}))})};mr.displayName=Vt;var Ve="DialogOverlay",br=u.forwardRef((e,t)=>{const n=gr(Ve,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,a=U(Ve,e.__scopeDialog);return a.modal?i.jsx(z,{present:r||a.open,children:i.jsx(La,{...o,ref:t})}):null});br.displayName=Ve;var La=u.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=U(Ve,n);return i.jsx(nr,{as:Ie,allowPinchZoom:!0,shards:[o.contentRef],children:i.jsx(S.div,{"data-state":Wt(o.open),...r,ref:t,style:{pointerEvents:"auto",...r.style}})})}),pe="DialogContent",vr=u.forwardRef((e,t)=>{const n=gr(pe,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,a=U(pe,e.__scopeDialog);return i.jsx(z,{present:r||a.open,children:a.modal?i.jsx(Ba,{...o,ref:t}):i.jsx(Ha,{...o,ref:t})})});vr.displayName=pe;var Ba=u.forwardRef((e,t)=>{const n=U(pe,e.__scopeDialog),r=u.useRef(null),o=L(t,n.contentRef,r);return u.useEffect(()=>{const a=r.current;if(a)return tr(a)},[]),i.jsx(wr,{...e,ref:o,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:x(e.onCloseAutoFocus,a=>{var s;a.preventDefault(),(s=n.triggerRef.current)==null||s.focus()}),onPointerDownOutside:x(e.onPointerDownOutside,a=>{const s=a.detail.originalEvent,c=s.button===0&&s.ctrlKey===!0;(s.button===2||c)&&a.preventDefault()}),onFocusOutside:x(e.onFocusOutside,a=>a.preventDefault())})}),Ha=u.forwardRef((e,t)=>{const n=U(pe,e.__scopeDialog),r=u.useRef(!1),o=u.useRef(!1);return i.jsx(wr,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:a=>{var s,c;(s=e.onCloseAutoFocus)==null||s.call(e,a),a.defaultPrevented||(r.current||(c=n.triggerRef.current)==null||c.focus(),a.preventDefault()),r.current=!1,o.current=!1},onInteractOutside:a=>{var l,f;(l=e.onInteractOutside)==null||l.call(e,a),a.defaultPrevented||(r.current=!0,a.detail.originalEvent.type==="pointerdown"&&(o.current=!0));const s=a.target;((f=n.triggerRef.current)==null?void 0:f.contains(s))&&a.preventDefault(),a.detail.originalEvent.type==="focusin"&&o.current&&a.preventDefault()}})}),wr=u.forwardRef((e,t)=>{const{__scopeDialog:n,trapFocus:r,onOpenAutoFocus:o,onCloseAutoFocus:a,...s}=e,c=U(pe,n),l=u.useRef(null),f=L(t,l);return rr(),i.jsxs(i.Fragment,{children:[i.jsx(or,{asChild:!0,loop:!0,trapped:r,onMountAutoFocus:o,onUnmountAutoFocus:a,children:i.jsx(Ut,{role:"dialog",id:c.contentId,"aria-describedby":c.descriptionId,"aria-labelledby":c.titleId,"data-state":Wt(c.open),...s,ref:f,onDismiss:()=>c.onOpenChange(!1)})}),i.jsxs(i.Fragment,{children:[i.jsx(Ua,{titleId:c.titleId}),i.jsx(Ga,{contentRef:l,descriptionId:c.descriptionId})]})]})}),zt="DialogTitle",yr=u.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=U(zt,n);return i.jsx(S.h2,{id:o.titleId,...r,ref:t})});yr.displayName=zt;var xr="DialogDescription",_r=u.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=U(xr,n);return i.jsx(S.p,{id:o.descriptionId,...r,ref:t})});_r.displayName=xr;var Cr="DialogClose",Er=u.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=U(Cr,n);return i.jsx(S.button,{type:"button",...r,ref:t,onClick:x(e.onClick,()=>o.onOpenChange(!1))})});Er.displayName=Cr;function Wt(e){return e?"open":"closed"}var Ir="DialogTitleWarning",[Lf,Sr]=ja(Ir,{contentName:pe,titleName:zt,docsSlug:"dialog"}),Ua=({titleId:e})=>{const t=Sr(Ir),n=`\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;return u.useEffect(()=>{e&&(document.getElementById(e)||console.error(n))},[n,e]),null},Ka="DialogDescriptionWarning",Ga=({contentRef:e,descriptionId:t})=>{const r=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Sr(Ka).contentName}}.`;return u.useEffect(()=>{var a;const o=(a=e.current)==null?void 0:a.getAttribute("aria-describedby");t&&o&&(document.getElementById(t)||console.warn(r))},[r,e,t]),null},Va=fr,za=hr,Wa=mr,qa=br,Ya=vr,Xa=yr,Ja=_r,Za=Er;/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qa=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]],Ar=B("Bell",Qa);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const es=[["path",{d:"m7 15 5 5 5-5",key:"1hf1tw"}],["path",{d:"m7 9 5-5 5 5",key:"sgt6xg"}]],ts=B("ChevronsUpDown",es);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ns=[["path",{d:"M20 17a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.9a2 2 0 0 1-1.69-.9l-.81-1.2a2 2 0 0 0-1.67-.9H8a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2Z",key:"4u7rpt"}],["path",{d:"M2 8v11a2 2 0 0 0 2 2h14",key:"1eicx1"}]],rs=B("Folders",ns);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const os=[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]],as=B("LogOut",os);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ss=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],An=B("Monitor",ss);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const is=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]],Tn=B("Moon",is);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cs=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],ls=B("Package",cs);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const us=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}]],ds=B("PanelLeft",us);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fs=[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],Tt=B("Settings",fs);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ps=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],Dn=B("Sun",ps);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hs=[["circle",{cx:"18",cy:"15",r:"3",key:"gjjjvw"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M10 15H6a4 4 0 0 0-4 4v2",key:"1nfge6"}],["path",{d:"m21.7 16.4-.9-.3",key:"12j9ji"}],["path",{d:"m15.2 13.9-.9-.3",key:"1fdjdi"}],["path",{d:"m16.6 18.7.3-.9",key:"heedtr"}],["path",{d:"m19.1 12.2.3-.9",key:"1af3ki"}],["path",{d:"m19.6 18.7-.4-1",key:"1x9vze"}],["path",{d:"m16.8 12.3-.4-1",key:"vqeiwj"}],["path",{d:"m14.3 16.6 1-.4",key:"1qlj63"}],["path",{d:"m20.7 13.8 1-.4",key:"1v5t8k"}]],gs=B("UserCog",hs);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ms=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],bs=B("X",ms);function vs({...e}){return i.jsx(Va,{"data-slot":"sheet",...e})}function Bf({...e}){return i.jsx(za,{"data-slot":"sheet-trigger",...e})}function ws({...e}){return i.jsx(Wa,{"data-slot":"sheet-portal",...e})}function ys({className:e,...t}){return i.jsx(qa,{"data-slot":"sheet-overlay",className:C("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",e),...t})}function xs({className:e,children:t,side:n="right",...r}){return i.jsxs(ws,{children:[i.jsx(ys,{}),i.jsxs(Ya,{"data-slot":"sheet-content",className:C("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",n==="right"&&"data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",n==="left"&&"data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",n==="top"&&"data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",n==="bottom"&&"data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",e),...r,children:[t,i.jsxs(Za,{className:"ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none",children:[i.jsx(bs,{className:"size-4"}),i.jsx("span",{className:"sr-only",children:"Close"})]})]})]})}function _s({className:e,...t}){return i.jsx("div",{"data-slot":"sheet-header",className:C("flex flex-col gap-1.5 p-4",e),...t})}function Cs({className:e,...t}){return i.jsx(Xa,{"data-slot":"sheet-title",className:C("text-foreground font-semibold",e),...t})}function Es({className:e,...t}){return i.jsx(Ja,{"data-slot":"sheet-description",className:C("text-muted-foreground text-sm",e),...t})}const Is=Qn("inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-auto",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",secondary:"border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",destructive:"border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",outline:"text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"}},defaultVariants:{variant:"default"}});function Ss({className:e,variant:t,asChild:n=!1,...r}){const o=n?Ie:"span";return i.jsx(o,{"data-slot":"badge",className:C(Is({variant:t}),e),...r})}var ht="rovingFocusGroup.onEntryFocus",As={bubbles:!1,cancelable:!0},Qe="RovingFocusGroup",[Dt,Tr,Ts]=ur(Qe),[Ds,Dr]=me(Qe,[Ts]),[js,Ms]=Ds(Qe),jr=u.forwardRef((e,t)=>i.jsx(Dt.Provider,{scope:e.__scopeRovingFocusGroup,children:i.jsx(Dt.Slot,{scope:e.__scopeRovingFocusGroup,children:i.jsx(Ns,{...e,ref:t})})}));jr.displayName=Qe;var Ns=u.forwardRef((e,t)=>{const{__scopeRovingFocusGroup:n,orientation:r,loop:o=!1,dir:a,currentTabStopId:s,defaultCurrentTabStopId:c,onCurrentTabStopIdChange:l,onEntryFocus:f,preventScrollOnEntryFocus:d=!1,...p}=e,g=u.useRef(null),h=L(t,g),m=ar(a),[y=null,v]=$e({prop:s,defaultProp:c,onChange:l}),[b,w]=u.useState(!1),E=Je(f),A=Tr(n),T=u.useRef(!1),[H,O]=u.useState(0);return u.useEffect(()=>{const D=g.current;if(D)return D.addEventListener(ht,E),()=>D.removeEventListener(ht,E)},[E]),i.jsx(js,{scope:n,orientation:r,dir:m,loop:o,currentTabStopId:y,onItemFocus:u.useCallback(D=>v(D),[v]),onItemShiftTab:u.useCallback(()=>w(!0),[]),onFocusableItemAdd:u.useCallback(()=>O(D=>D+1),[]),onFocusableItemRemove:u.useCallback(()=>O(D=>D-1),[]),children:i.jsx(S.div,{tabIndex:b||H===0?-1:0,"data-orientation":r,...p,ref:h,style:{outline:"none",...e.style},onMouseDown:x(e.onMouseDown,()=>{T.current=!0}),onFocus:x(e.onFocus,D=>{const k=!T.current;if(D.target===D.currentTarget&&k&&!b){const K=new CustomEvent(ht,As);if(D.currentTarget.dispatchEvent(K),!K.defaultPrevented){const ie=A().filter(q=>q.focusable),W=ie.find(q=>q.active),Ue=ie.find(q=>q.id===y),dt=[W,Ue,...ie].filter(Boolean).map(q=>q.ref.current);Rr(dt,d)}}T.current=!1}),onBlur:x(e.onBlur,()=>w(!1))})})}),Mr="RovingFocusGroupItem",Nr=u.forwardRef((e,t)=>{const{__scopeRovingFocusGroup:n,focusable:r=!0,active:o=!1,tabStopId:a,...s}=e,c=re(),l=a||c,f=Ms(Mr,n),d=f.currentTabStopId===l,p=Tr(n),{onFocusableItemAdd:g,onFocusableItemRemove:h}=f;return u.useEffect(()=>{if(r)return g(),()=>h()},[r,g,h]),i.jsx(Dt.ItemSlot,{scope:n,id:l,focusable:r,active:o,children:i.jsx(S.span,{tabIndex:d?0:-1,"data-orientation":f.orientation,...s,ref:t,onMouseDown:x(e.onMouseDown,m=>{r?f.onItemFocus(l):m.preventDefault()}),onFocus:x(e.onFocus,()=>f.onItemFocus(l)),onKeyDown:x(e.onKeyDown,m=>{if(m.key==="Tab"&&m.shiftKey){f.onItemShiftTab();return}if(m.target!==m.currentTarget)return;const y=Os(m,f.orientation,f.dir);if(y!==void 0){if(m.metaKey||m.ctrlKey||m.altKey||m.shiftKey)return;m.preventDefault();let b=p().filter(w=>w.focusable).map(w=>w.ref.current);if(y==="last")b.reverse();else if(y==="prev"||y==="next"){y==="prev"&&b.reverse();const w=b.indexOf(m.currentTarget);b=f.loop?Ps(b,w+1):b.slice(w+1)}setTimeout(()=>Rr(b))}})})})});Nr.displayName=Mr;var Rs={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function ks(e,t){return t!=="rtl"?e:e==="ArrowLeft"?"ArrowRight":e==="ArrowRight"?"ArrowLeft":e}function Os(e,t,n){const r=ks(e.key,n);if(!(t==="vertical"&&["ArrowLeft","ArrowRight"].includes(r))&&!(t==="horizontal"&&["ArrowUp","ArrowDown"].includes(r)))return Rs[r]}function Rr(e,t=!1){const n=document.activeElement;for(const r of e)if(r===n||(r.focus({preventScroll:t}),document.activeElement!==n))return}function Ps(e,t){return e.map((n,r)=>e[(t+r)%e.length])}var $s=jr,Fs=Nr,jt=["Enter"," "],Ls=["ArrowDown","PageUp","Home"],kr=["ArrowUp","PageDown","End"],Bs=[...Ls,...kr],Hs={ltr:[...jt,"ArrowRight"],rtl:[...jt,"ArrowLeft"]},Us={ltr:["ArrowLeft"],rtl:["ArrowRight"]},Fe="Menu",[De,Ks,Gs]=ur(Fe),[be,Or]=me(Fe,[Gs,Ze,Dr]),et=Ze(),Pr=Dr(),[Vs,ve]=be(Fe),[zs,Le]=be(Fe),$r=e=>{const{__scopeMenu:t,open:n=!1,children:r,dir:o,onOpenChange:a,modal:s=!0}=e,c=et(t),[l,f]=u.useState(null),d=u.useRef(!1),p=Je(a),g=ar(o);return u.useEffect(()=>{const h=()=>{d.current=!0,document.addEventListener("pointerdown",m,{capture:!0,once:!0}),document.addEventListener("pointermove",m,{capture:!0,once:!0})},m=()=>d.current=!1;return document.addEventListener("keydown",h,{capture:!0}),()=>{document.removeEventListener("keydown",h,{capture:!0}),document.removeEventListener("pointerdown",m,{capture:!0}),document.removeEventListener("pointermove",m,{capture:!0})}},[]),i.jsx(sr,{...c,children:i.jsx(Vs,{scope:t,open:n,onOpenChange:p,content:l,onContentChange:f,children:i.jsx(zs,{scope:t,onClose:u.useCallback(()=>p(!1),[p]),isUsingKeyboardRef:d,dir:g,modal:s,children:r})})})};$r.displayName=Fe;var Ws="MenuAnchor",qt=u.forwardRef((e,t)=>{const{__scopeMenu:n,...r}=e,o=et(n);return i.jsx(ir,{...o,...r,ref:t})});qt.displayName=Ws;var Yt="MenuPortal",[qs,Fr]=be(Yt,{forceMount:void 0}),Lr=e=>{const{__scopeMenu:t,forceMount:n,children:r,container:o}=e,a=ve(Yt,t);return i.jsx(qs,{scope:t,forceMount:n,children:i.jsx(z,{present:n||a.open,children:i.jsx(Ht,{asChild:!0,container:o,children:r})})})};Lr.displayName=Yt;var F="MenuContent",[Ys,Xt]=be(F),Br=u.forwardRef((e,t)=>{const n=Fr(F,e.__scopeMenu),{forceMount:r=n.forceMount,...o}=e,a=ve(F,e.__scopeMenu),s=Le(F,e.__scopeMenu);return i.jsx(De.Provider,{scope:e.__scopeMenu,children:i.jsx(z,{present:r||a.open,children:i.jsx(De.Slot,{scope:e.__scopeMenu,children:s.modal?i.jsx(Xs,{...o,ref:t}):i.jsx(Js,{...o,ref:t})})})})}),Xs=u.forwardRef((e,t)=>{const n=ve(F,e.__scopeMenu),r=u.useRef(null),o=L(t,r);return u.useEffect(()=>{const a=r.current;if(a)return tr(a)},[]),i.jsx(Jt,{...e,ref:o,trapFocus:n.open,disableOutsidePointerEvents:n.open,disableOutsideScroll:!0,onFocusOutside:x(e.onFocusOutside,a=>a.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>n.onOpenChange(!1)})}),Js=u.forwardRef((e,t)=>{const n=ve(F,e.__scopeMenu);return i.jsx(Jt,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>n.onOpenChange(!1)})}),Jt=u.forwardRef((e,t)=>{const{__scopeMenu:n,loop:r=!1,trapFocus:o,onOpenAutoFocus:a,onCloseAutoFocus:s,disableOutsidePointerEvents:c,onEntryFocus:l,onEscapeKeyDown:f,onPointerDownOutside:d,onFocusOutside:p,onInteractOutside:g,onDismiss:h,disableOutsideScroll:m,...y}=e,v=ve(F,n),b=Le(F,n),w=et(n),E=Pr(n),A=Ks(n),[T,H]=u.useState(null),O=u.useRef(null),D=L(t,O,v.onContentChange),k=u.useRef(0),K=u.useRef(""),ie=u.useRef(0),W=u.useRef(null),Ue=u.useRef("right"),Ke=u.useRef(0),dt=m?nr:u.Fragment,q=m?{as:Ie,allowPinchZoom:!0}:void 0,Sa=_=>{var xe,En;const $=K.current+_,G=A().filter(Y=>!Y.disabled),ee=document.activeElement,ft=(xe=G.find(Y=>Y.ref.current===ee))==null?void 0:xe.textValue,pt=G.map(Y=>Y.textValue),Cn=li(pt,$,ft),Se=(En=G.find(Y=>Y.textValue===Cn))==null?void 0:En.ref.current;(function Y(In){K.current=In,window.clearTimeout(k.current),In!==""&&(k.current=window.setTimeout(()=>Y(""),1e3))})($),Se&&setTimeout(()=>Se.focus())};u.useEffect(()=>()=>window.clearTimeout(k.current),[]),rr();const ye=u.useCallback(_=>{var G,ee;return Ue.current===((G=W.current)==null?void 0:G.side)&&di(_,(ee=W.current)==null?void 0:ee.area)},[]);return i.jsx(Ys,{scope:n,searchRef:K,onItemEnter:u.useCallback(_=>{ye(_)&&_.preventDefault()},[ye]),onItemLeave:u.useCallback(_=>{var $;ye(_)||(($=O.current)==null||$.focus(),H(null))},[ye]),onTriggerLeave:u.useCallback(_=>{ye(_)&&_.preventDefault()},[ye]),pointerGraceTimerRef:ie,onPointerGraceIntentChange:u.useCallback(_=>{W.current=_},[]),children:i.jsx(dt,{...q,children:i.jsx(or,{asChild:!0,trapped:o,onMountAutoFocus:x(a,_=>{var $;_.preventDefault(),($=O.current)==null||$.focus({preventScroll:!0})}),onUnmountAutoFocus:s,children:i.jsx(Ut,{asChild:!0,disableOutsidePointerEvents:c,onEscapeKeyDown:f,onPointerDownOutside:d,onFocusOutside:p,onInteractOutside:g,onDismiss:h,children:i.jsx($s,{asChild:!0,...E,dir:b.dir,orientation:"vertical",loop:r,currentTabStopId:T,onCurrentTabStopIdChange:H,onEntryFocus:x(l,_=>{b.isUsingKeyboardRef.current||_.preventDefault()}),preventScrollOnEntryFocus:!0,children:i.jsx(cr,{role:"menu","aria-orientation":"vertical","data-state":no(v.open),"data-radix-menu-content":"",dir:b.dir,...w,...y,ref:D,style:{outline:"none",...y.style},onKeyDown:x(y.onKeyDown,_=>{const G=_.target.closest("[data-radix-menu-content]")===_.currentTarget,ee=_.ctrlKey||_.altKey||_.metaKey,ft=_.key.length===1;G&&(_.key==="Tab"&&_.preventDefault(),!ee&&ft&&Sa(_.key));const pt=O.current;if(_.target!==pt||!Bs.includes(_.key))return;_.preventDefault();const Se=A().filter(xe=>!xe.disabled).map(xe=>xe.ref.current);kr.includes(_.key)&&Se.reverse(),ii(Se)}),onBlur:x(e.onBlur,_=>{_.currentTarget.contains(_.target)||(window.clearTimeout(k.current),K.current="")}),onPointerMove:x(e.onPointerMove,je(_=>{const $=_.target,G=Ke.current!==_.clientX;if(_.currentTarget.contains($)&&G){const ee=_.clientX>Ke.current?"right":"left";Ue.current=ee,Ke.current=_.clientX}}))})})})})})})});Br.displayName=F;var Zs="MenuGroup",Zt=u.forwardRef((e,t)=>{const{__scopeMenu:n,...r}=e;return i.jsx(S.div,{role:"group",...r,ref:t})});Zt.displayName=Zs;var Qs="MenuLabel",Hr=u.forwardRef((e,t)=>{const{__scopeMenu:n,...r}=e;return i.jsx(S.div,{...r,ref:t})});Hr.displayName=Qs;var ze="MenuItem",jn="menu.itemSelect",tt=u.forwardRef((e,t)=>{const{disabled:n=!1,onSelect:r,...o}=e,a=u.useRef(null),s=Le(ze,e.__scopeMenu),c=Xt(ze,e.__scopeMenu),l=L(t,a),f=u.useRef(!1),d=()=>{const p=a.current;if(!n&&p){const g=new CustomEvent(jn,{bubbles:!0,cancelable:!0});p.addEventListener(jn,h=>r==null?void 0:r(h),{once:!0}),Ma(p,g),g.defaultPrevented?f.current=!1:s.onClose()}};return i.jsx(Ur,{...o,ref:l,disabled:n,onClick:x(e.onClick,d),onPointerDown:p=>{var g;(g=e.onPointerDown)==null||g.call(e,p),f.current=!0},onPointerUp:x(e.onPointerUp,p=>{var g;f.current||(g=p.currentTarget)==null||g.click()}),onKeyDown:x(e.onKeyDown,p=>{const g=c.searchRef.current!=="";n||g&&p.key===" "||jt.includes(p.key)&&(p.currentTarget.click(),p.preventDefault())})})});tt.displayName=ze;var Ur=u.forwardRef((e,t)=>{const{__scopeMenu:n,disabled:r=!1,textValue:o,...a}=e,s=Xt(ze,n),c=Pr(n),l=u.useRef(null),f=L(t,l),[d,p]=u.useState(!1),[g,h]=u.useState("");return u.useEffect(()=>{const m=l.current;m&&h((m.textContent??"").trim())},[a.children]),i.jsx(De.ItemSlot,{scope:n,disabled:r,textValue:o??g,children:i.jsx(Fs,{asChild:!0,...c,focusable:!r,children:i.jsx(S.div,{role:"menuitem","data-highlighted":d?"":void 0,"aria-disabled":r||void 0,"data-disabled":r?"":void 0,...a,ref:f,onPointerMove:x(e.onPointerMove,je(m=>{r?s.onItemLeave(m):(s.onItemEnter(m),m.defaultPrevented||m.currentTarget.focus({preventScroll:!0}))})),onPointerLeave:x(e.onPointerLeave,je(m=>s.onItemLeave(m))),onFocus:x(e.onFocus,()=>p(!0)),onBlur:x(e.onBlur,()=>p(!1))})})})}),ei="MenuCheckboxItem",Kr=u.forwardRef((e,t)=>{const{checked:n=!1,onCheckedChange:r,...o}=e;return i.jsx(qr,{scope:e.__scopeMenu,checked:n,children:i.jsx(tt,{role:"menuitemcheckbox","aria-checked":We(n)?"mixed":n,...o,ref:t,"data-state":en(n),onSelect:x(o.onSelect,()=>r==null?void 0:r(We(n)?!0:!n),{checkForDefaultPrevented:!1})})})});Kr.displayName=ei;var Gr="MenuRadioGroup",[ti,ni]=be(Gr,{value:void 0,onValueChange:()=>{}}),Vr=u.forwardRef((e,t)=>{const{value:n,onValueChange:r,...o}=e,a=Je(r);return i.jsx(ti,{scope:e.__scopeMenu,value:n,onValueChange:a,children:i.jsx(Zt,{...o,ref:t})})});Vr.displayName=Gr;var zr="MenuRadioItem",Wr=u.forwardRef((e,t)=>{const{value:n,...r}=e,o=ni(zr,e.__scopeMenu),a=n===o.value;return i.jsx(qr,{scope:e.__scopeMenu,checked:a,children:i.jsx(tt,{role:"menuitemradio","aria-checked":a,...r,ref:t,"data-state":en(a),onSelect:x(r.onSelect,()=>{var s;return(s=o.onValueChange)==null?void 0:s.call(o,n)},{checkForDefaultPrevented:!1})})})});Wr.displayName=zr;var Qt="MenuItemIndicator",[qr,ri]=be(Qt,{checked:!1}),Yr=u.forwardRef((e,t)=>{const{__scopeMenu:n,forceMount:r,...o}=e,a=ri(Qt,n);return i.jsx(z,{present:r||We(a.checked)||a.checked===!0,children:i.jsx(S.span,{...o,ref:t,"data-state":en(a.checked)})})});Yr.displayName=Qt;var oi="MenuSeparator",Xr=u.forwardRef((e,t)=>{const{__scopeMenu:n,...r}=e;return i.jsx(S.div,{role:"separator","aria-orientation":"horizontal",...r,ref:t})});Xr.displayName=oi;var ai="MenuArrow",Jr=u.forwardRef((e,t)=>{const{__scopeMenu:n,...r}=e,o=et(n);return i.jsx(lr,{...o,...r,ref:t})});Jr.displayName=ai;var si="MenuSub",[Hf,Zr]=be(si),Te="MenuSubTrigger",Qr=u.forwardRef((e,t)=>{const n=ve(Te,e.__scopeMenu),r=Le(Te,e.__scopeMenu),o=Zr(Te,e.__scopeMenu),a=Xt(Te,e.__scopeMenu),s=u.useRef(null),{pointerGraceTimerRef:c,onPointerGraceIntentChange:l}=a,f={__scopeMenu:e.__scopeMenu},d=u.useCallback(()=>{s.current&&window.clearTimeout(s.current),s.current=null},[]);return u.useEffect(()=>d,[d]),u.useEffect(()=>{const p=c.current;return()=>{window.clearTimeout(p),l(null)}},[c,l]),i.jsx(qt,{asChild:!0,...f,children:i.jsx(Ur,{id:o.triggerId,"aria-haspopup":"menu","aria-expanded":n.open,"aria-controls":o.contentId,"data-state":no(n.open),...e,ref:er(t,o.onTriggerChange),onClick:p=>{var g;(g=e.onClick)==null||g.call(e,p),!(e.disabled||p.defaultPrevented)&&(p.currentTarget.focus(),n.open||n.onOpenChange(!0))},onPointerMove:x(e.onPointerMove,je(p=>{a.onItemEnter(p),!p.defaultPrevented&&!e.disabled&&!n.open&&!s.current&&(a.onPointerGraceIntentChange(null),s.current=window.setTimeout(()=>{n.onOpenChange(!0),d()},100))})),onPointerLeave:x(e.onPointerLeave,je(p=>{var h,m;d();const g=(h=n.content)==null?void 0:h.getBoundingClientRect();if(g){const y=(m=n.content)==null?void 0:m.dataset.side,v=y==="right",b=v?-5:5,w=g[v?"left":"right"],E=g[v?"right":"left"];a.onPointerGraceIntentChange({area:[{x:p.clientX+b,y:p.clientY},{x:w,y:g.top},{x:E,y:g.top},{x:E,y:g.bottom},{x:w,y:g.bottom}],side:y}),window.clearTimeout(c.current),c.current=window.setTimeout(()=>a.onPointerGraceIntentChange(null),300)}else{if(a.onTriggerLeave(p),p.defaultPrevented)return;a.onPointerGraceIntentChange(null)}})),onKeyDown:x(e.onKeyDown,p=>{var h;const g=a.searchRef.current!=="";e.disabled||g&&p.key===" "||Hs[r.dir].includes(p.key)&&(n.onOpenChange(!0),(h=n.content)==null||h.focus(),p.preventDefault())})})})});Qr.displayName=Te;var eo="MenuSubContent",to=u.forwardRef((e,t)=>{const n=Fr(F,e.__scopeMenu),{forceMount:r=n.forceMount,...o}=e,a=ve(F,e.__scopeMenu),s=Le(F,e.__scopeMenu),c=Zr(eo,e.__scopeMenu),l=u.useRef(null),f=L(t,l);return i.jsx(De.Provider,{scope:e.__scopeMenu,children:i.jsx(z,{present:r||a.open,children:i.jsx(De.Slot,{scope:e.__scopeMenu,children:i.jsx(Jt,{id:c.contentId,"aria-labelledby":c.triggerId,...o,ref:f,align:"start",side:s.dir==="rtl"?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:d=>{var p;s.isUsingKeyboardRef.current&&((p=l.current)==null||p.focus()),d.preventDefault()},onCloseAutoFocus:d=>d.preventDefault(),onFocusOutside:x(e.onFocusOutside,d=>{d.target!==c.trigger&&a.onOpenChange(!1)}),onEscapeKeyDown:x(e.onEscapeKeyDown,d=>{s.onClose(),d.preventDefault()}),onKeyDown:x(e.onKeyDown,d=>{var h;const p=d.currentTarget.contains(d.target),g=Us[s.dir].includes(d.key);p&&g&&(a.onOpenChange(!1),(h=c.trigger)==null||h.focus(),d.preventDefault())})})})})})});to.displayName=eo;function no(e){return e?"open":"closed"}function We(e){return e==="indeterminate"}function en(e){return We(e)?"indeterminate":e?"checked":"unchecked"}function ii(e){const t=document.activeElement;for(const n of e)if(n===t||(n.focus(),document.activeElement!==t))return}function ci(e,t){return e.map((n,r)=>e[(t+r)%e.length])}function li(e,t,n){const o=t.length>1&&Array.from(t).every(f=>f===t[0])?t[0]:t,a=n?e.indexOf(n):-1;let s=ci(e,Math.max(a,0));o.length===1&&(s=s.filter(f=>f!==n));const l=s.find(f=>f.toLowerCase().startsWith(o.toLowerCase()));return l!==n?l:void 0}function ui(e,t){const{x:n,y:r}=e;let o=!1;for(let a=0,s=t.length-1;a<t.length;s=a++){const c=t[a].x,l=t[a].y,f=t[s].x,d=t[s].y;l>r!=d>r&&n<(f-c)*(r-l)/(d-l)+c&&(o=!o)}return o}function di(e,t){if(!t)return!1;const n={x:e.clientX,y:e.clientY};return ui(n,t)}function je(e){return t=>t.pointerType==="mouse"?e(t):void 0}var fi=$r,pi=qt,hi=Lr,gi=Br,mi=Zt,bi=Hr,vi=tt,wi=Kr,yi=Vr,xi=Wr,_i=Yr,Ci=Xr,Ei=Jr,Ii=Qr,Si=to,tn="DropdownMenu",[Ai,Uf]=me(tn,[Or]),R=Or(),[Ti,ro]=Ai(tn),oo=e=>{const{__scopeDropdownMenu:t,children:n,dir:r,open:o,defaultOpen:a,onOpenChange:s,modal:c=!0}=e,l=R(t),f=u.useRef(null),[d=!1,p]=$e({prop:o,defaultProp:a,onChange:s});return i.jsx(Ti,{scope:t,triggerId:re(),triggerRef:f,contentId:re(),open:d,onOpenChange:p,onOpenToggle:u.useCallback(()=>p(g=>!g),[p]),modal:c,children:i.jsx(fi,{...l,open:d,onOpenChange:p,dir:r,modal:c,children:n})})};oo.displayName=tn;var ao="DropdownMenuTrigger",so=u.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,disabled:r=!1,...o}=e,a=ro(ao,n),s=R(n);return i.jsx(pi,{asChild:!0,...s,children:i.jsx(S.button,{type:"button",id:a.triggerId,"aria-haspopup":"menu","aria-expanded":a.open,"aria-controls":a.open?a.contentId:void 0,"data-state":a.open?"open":"closed","data-disabled":r?"":void 0,disabled:r,...o,ref:er(t,a.triggerRef),onPointerDown:x(e.onPointerDown,c=>{!r&&c.button===0&&c.ctrlKey===!1&&(a.onOpenToggle(),a.open||c.preventDefault())}),onKeyDown:x(e.onKeyDown,c=>{r||(["Enter"," "].includes(c.key)&&a.onOpenToggle(),c.key==="ArrowDown"&&a.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(c.key)&&c.preventDefault())})})})});so.displayName=ao;var Di="DropdownMenuPortal",io=e=>{const{__scopeDropdownMenu:t,...n}=e,r=R(t);return i.jsx(hi,{...r,...n})};io.displayName=Di;var co="DropdownMenuContent",lo=u.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...r}=e,o=ro(co,n),a=R(n),s=u.useRef(!1);return i.jsx(gi,{id:o.contentId,"aria-labelledby":o.triggerId,...a,...r,ref:t,onCloseAutoFocus:x(e.onCloseAutoFocus,c=>{var l;s.current||(l=o.triggerRef.current)==null||l.focus(),s.current=!1,c.preventDefault()}),onInteractOutside:x(e.onInteractOutside,c=>{const l=c.detail.originalEvent,f=l.button===0&&l.ctrlKey===!0,d=l.button===2||f;(!o.modal||d)&&(s.current=!0)}),style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});lo.displayName=co;var ji="DropdownMenuGroup",uo=u.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...r}=e,o=R(n);return i.jsx(mi,{...o,...r,ref:t})});uo.displayName=ji;var Mi="DropdownMenuLabel",fo=u.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...r}=e,o=R(n);return i.jsx(bi,{...o,...r,ref:t})});fo.displayName=Mi;var Ni="DropdownMenuItem",po=u.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...r}=e,o=R(n);return i.jsx(vi,{...o,...r,ref:t})});po.displayName=Ni;var Ri="DropdownMenuCheckboxItem",ho=u.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...r}=e,o=R(n);return i.jsx(wi,{...o,...r,ref:t})});ho.displayName=Ri;var ki="DropdownMenuRadioGroup",Oi=u.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...r}=e,o=R(n);return i.jsx(yi,{...o,...r,ref:t})});Oi.displayName=ki;var Pi="DropdownMenuRadioItem",$i=u.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...r}=e,o=R(n);return i.jsx(xi,{...o,...r,ref:t})});$i.displayName=Pi;var Fi="DropdownMenuItemIndicator",go=u.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...r}=e,o=R(n);return i.jsx(_i,{...o,...r,ref:t})});go.displayName=Fi;var Li="DropdownMenuSeparator",mo=u.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...r}=e,o=R(n);return i.jsx(Ci,{...o,...r,ref:t})});mo.displayName=Li;var Bi="DropdownMenuArrow",Hi=u.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...r}=e,o=R(n);return i.jsx(Ei,{...o,...r,ref:t})});Hi.displayName=Bi;var Ui="DropdownMenuSubTrigger",Ki=u.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...r}=e,o=R(n);return i.jsx(Ii,{...o,...r,ref:t})});Ki.displayName=Ui;var Gi="DropdownMenuSubContent",Vi=u.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...r}=e,o=R(n);return i.jsx(Si,{...o,...r,ref:t,style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});Vi.displayName=Gi;var zi=oo,Wi=so,qi=io,Yi=lo,Xi=uo,Ji=fo,Zi=po,Qi=ho,ec=go,tc=mo;function bo({...e}){return i.jsx(zi,{"data-slot":"dropdown-menu",...e})}function vo({...e}){return i.jsx(Wi,{"data-slot":"dropdown-menu-trigger",...e})}function wo({className:e,sideOffset:t=4,...n}){return i.jsx(qi,{children:i.jsx(Yi,{"data-slot":"dropdown-menu-content",sideOffset:t,className:C("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",e),...n})})}function nc({...e}){return i.jsx(Xi,{"data-slot":"dropdown-menu-group",...e})}function _e({className:e,inset:t,variant:n="default",...r}){return i.jsx(Zi,{"data-slot":"dropdown-menu-item","data-inset":t,"data-variant":n,className:C("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40 data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-destructive-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",e),...r})}function Kf({className:e,children:t,checked:n,...r}){return i.jsxs(Qi,{"data-slot":"dropdown-menu-checkbox-item",className:C("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",e),checked:n,...r,children:[i.jsx("span",{className:"pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",children:i.jsx(ec,{children:i.jsx(ka,{className:"size-4"})})}),t]})}function rc({className:e,inset:t,...n}){return i.jsx(Ji,{"data-slot":"dropdown-menu-label","data-inset":t,className:C("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",e),...n})}function Mn({className:e,...t}){return i.jsx(tc,{"data-slot":"dropdown-menu-separator",className:C("bg-border -mx-1 my-1 h-px",e),...t})}var nn="Collapsible",[oc,Gf]=me(nn),[ac,rn]=oc(nn),on=u.forwardRef((e,t)=>{const{__scopeCollapsible:n,open:r,defaultOpen:o,disabled:a,onOpenChange:s,...c}=e,[l=!1,f]=$e({prop:r,defaultProp:o,onChange:s});return i.jsx(ac,{scope:n,disabled:a,contentId:re(),open:l,onOpenToggle:u.useCallback(()=>f(d=>!d),[f]),children:i.jsx(S.div,{"data-state":ln(l),"data-disabled":a?"":void 0,...c,ref:t})})});on.displayName=nn;var yo="CollapsibleTrigger",an=u.forwardRef((e,t)=>{const{__scopeCollapsible:n,...r}=e,o=rn(yo,n);return i.jsx(S.button,{type:"button","aria-controls":o.contentId,"aria-expanded":o.open||!1,"data-state":ln(o.open),"data-disabled":o.disabled?"":void 0,disabled:o.disabled,...r,ref:t,onClick:x(e.onClick,o.onOpenToggle)})});an.displayName=yo;var sn="CollapsibleContent",cn=u.forwardRef((e,t)=>{const{forceMount:n,...r}=e,o=rn(sn,e.__scopeCollapsible);return i.jsx(z,{present:n||o.open,children:({present:a})=>i.jsx(sc,{...r,ref:t,present:a})})});cn.displayName=sn;var sc=u.forwardRef((e,t)=>{const{__scopeCollapsible:n,present:r,children:o,...a}=e,s=rn(sn,n),[c,l]=u.useState(r),f=u.useRef(null),d=L(t,f),p=u.useRef(0),g=p.current,h=u.useRef(0),m=h.current,y=s.open||c,v=u.useRef(y),b=u.useRef(void 0);return u.useEffect(()=>{const w=requestAnimationFrame(()=>v.current=!1);return()=>cancelAnimationFrame(w)},[]),Kt(()=>{const w=f.current;if(w){b.current=b.current||{transitionDuration:w.style.transitionDuration,animationName:w.style.animationName},w.style.transitionDuration="0s",w.style.animationName="none";const E=w.getBoundingClientRect();p.current=E.height,h.current=E.width,v.current||(w.style.transitionDuration=b.current.transitionDuration,w.style.animationName=b.current.animationName),l(r)}},[s.open,r]),i.jsx(S.div,{"data-state":ln(s.open),"data-disabled":s.disabled?"":void 0,id:s.contentId,hidden:!y,...a,ref:d,style:{"--radix-collapsible-content-height":g?`${g}px`:void 0,"--radix-collapsible-content-width":m?`${m}px`:void 0,...e.style},children:y&&o})});function ln(e){return e?"open":"closed"}var Vf=on,zf=an,Wf=cn;const gt=768;function xo(){const[e,t]=u.useState();return u.useEffect(()=>{const n=window.matchMedia(`(max-width: ${gt-1}px)`),r=()=>{t(window.innerWidth<gt)};return n.addEventListener("change",r),t(window.innerWidth<gt),()=>n.removeEventListener("change",r)},[]),!!e}var[nt,qf]=me("Tooltip",[Ze]),rt=Ze(),_o="TooltipProvider",ic=700,Mt="tooltip.open",[cc,un]=nt(_o),Co=e=>{const{__scopeTooltip:t,delayDuration:n=ic,skipDelayDuration:r=300,disableHoverableContent:o=!1,children:a}=e,[s,c]=u.useState(!0),l=u.useRef(!1),f=u.useRef(0);return u.useEffect(()=>{const d=f.current;return()=>window.clearTimeout(d)},[]),i.jsx(cc,{scope:t,isOpenDelayed:s,delayDuration:n,onOpen:u.useCallback(()=>{window.clearTimeout(f.current),c(!1)},[]),onClose:u.useCallback(()=>{window.clearTimeout(f.current),f.current=window.setTimeout(()=>c(!0),r)},[r]),isPointerInTransitRef:l,onPointerInTransitChange:u.useCallback(d=>{l.current=d},[]),disableHoverableContent:o,children:a})};Co.displayName=_o;var ot="Tooltip",[lc,Be]=nt(ot),Eo=e=>{const{__scopeTooltip:t,children:n,open:r,defaultOpen:o=!1,onOpenChange:a,disableHoverableContent:s,delayDuration:c}=e,l=un(ot,e.__scopeTooltip),f=rt(t),[d,p]=u.useState(null),g=re(),h=u.useRef(0),m=s??l.disableHoverableContent,y=c??l.delayDuration,v=u.useRef(!1),[b=!1,w]=$e({prop:r,defaultProp:o,onChange:O=>{O?(l.onOpen(),document.dispatchEvent(new CustomEvent(Mt))):l.onClose(),a==null||a(O)}}),E=u.useMemo(()=>b?v.current?"delayed-open":"instant-open":"closed",[b]),A=u.useCallback(()=>{window.clearTimeout(h.current),h.current=0,v.current=!1,w(!0)},[w]),T=u.useCallback(()=>{window.clearTimeout(h.current),h.current=0,w(!1)},[w]),H=u.useCallback(()=>{window.clearTimeout(h.current),h.current=window.setTimeout(()=>{v.current=!0,w(!0),h.current=0},y)},[y,w]);return u.useEffect(()=>()=>{h.current&&(window.clearTimeout(h.current),h.current=0)},[]),i.jsx(sr,{...f,children:i.jsx(lc,{scope:t,contentId:g,open:b,stateAttribute:E,trigger:d,onTriggerChange:p,onTriggerEnter:u.useCallback(()=>{l.isOpenDelayed?H():A()},[l.isOpenDelayed,H,A]),onTriggerLeave:u.useCallback(()=>{m?T():(window.clearTimeout(h.current),h.current=0)},[T,m]),onOpen:A,onClose:T,disableHoverableContent:m,children:n})})};Eo.displayName=ot;var Nt="TooltipTrigger",Io=u.forwardRef((e,t)=>{const{__scopeTooltip:n,...r}=e,o=Be(Nt,n),a=un(Nt,n),s=rt(n),c=u.useRef(null),l=L(t,c,o.onTriggerChange),f=u.useRef(!1),d=u.useRef(!1),p=u.useCallback(()=>f.current=!1,[]);return u.useEffect(()=>()=>document.removeEventListener("pointerup",p),[p]),i.jsx(ir,{asChild:!0,...s,children:i.jsx(S.button,{"aria-describedby":o.open?o.contentId:void 0,"data-state":o.stateAttribute,...r,ref:l,onPointerMove:x(e.onPointerMove,g=>{g.pointerType!=="touch"&&!d.current&&!a.isPointerInTransitRef.current&&(o.onTriggerEnter(),d.current=!0)}),onPointerLeave:x(e.onPointerLeave,()=>{o.onTriggerLeave(),d.current=!1}),onPointerDown:x(e.onPointerDown,()=>{f.current=!0,document.addEventListener("pointerup",p,{once:!0})}),onFocus:x(e.onFocus,()=>{f.current||o.onOpen()}),onBlur:x(e.onBlur,o.onClose),onClick:x(e.onClick,o.onClose)})})});Io.displayName=Nt;var dn="TooltipPortal",[uc,dc]=nt(dn,{forceMount:void 0}),So=e=>{const{__scopeTooltip:t,forceMount:n,children:r,container:o}=e,a=Be(dn,t);return i.jsx(uc,{scope:t,forceMount:n,children:i.jsx(z,{present:n||a.open,children:i.jsx(Ht,{asChild:!0,container:o,children:r})})})};So.displayName=dn;var Ee="TooltipContent",Ao=u.forwardRef((e,t)=>{const n=dc(Ee,e.__scopeTooltip),{forceMount:r=n.forceMount,side:o="top",...a}=e,s=Be(Ee,e.__scopeTooltip);return i.jsx(z,{present:r||s.open,children:s.disableHoverableContent?i.jsx(To,{side:o,...a,ref:t}):i.jsx(fc,{side:o,...a,ref:t})})}),fc=u.forwardRef((e,t)=>{const n=Be(Ee,e.__scopeTooltip),r=un(Ee,e.__scopeTooltip),o=u.useRef(null),a=L(t,o),[s,c]=u.useState(null),{trigger:l,onClose:f}=n,d=o.current,{onPointerInTransitChange:p}=r,g=u.useCallback(()=>{c(null),p(!1)},[p]),h=u.useCallback((m,y)=>{const v=m.currentTarget,b={x:m.clientX,y:m.clientY},w=gc(b,v.getBoundingClientRect()),E=mc(b,w),A=bc(y.getBoundingClientRect()),T=wc([...E,...A]);c(T),p(!0)},[p]);return u.useEffect(()=>()=>g(),[g]),u.useEffect(()=>{if(l&&d){const m=v=>h(v,d),y=v=>h(v,l);return l.addEventListener("pointerleave",m),d.addEventListener("pointerleave",y),()=>{l.removeEventListener("pointerleave",m),d.removeEventListener("pointerleave",y)}}},[l,d,h,g]),u.useEffect(()=>{if(s){const m=y=>{const v=y.target,b={x:y.clientX,y:y.clientY},w=(l==null?void 0:l.contains(v))||(d==null?void 0:d.contains(v)),E=!vc(b,s);w?g():E&&(g(),f())};return document.addEventListener("pointermove",m),()=>document.removeEventListener("pointermove",m)}},[l,d,s,f,g]),i.jsx(To,{...e,ref:a})}),[pc,hc]=nt(ot,{isInside:!1}),To=u.forwardRef((e,t)=>{const{__scopeTooltip:n,children:r,"aria-label":o,onEscapeKeyDown:a,onPointerDownOutside:s,...c}=e,l=Be(Ee,n),f=rt(n),{onClose:d}=l;return u.useEffect(()=>(document.addEventListener(Mt,d),()=>document.removeEventListener(Mt,d)),[d]),u.useEffect(()=>{if(l.trigger){const p=g=>{const h=g.target;h!=null&&h.contains(l.trigger)&&d()};return window.addEventListener("scroll",p,{capture:!0}),()=>window.removeEventListener("scroll",p,{capture:!0})}},[l.trigger,d]),i.jsx(Ut,{asChild:!0,disableOutsidePointerEvents:!1,onEscapeKeyDown:a,onPointerDownOutside:s,onFocusOutside:p=>p.preventDefault(),onDismiss:d,children:i.jsxs(cr,{"data-state":l.stateAttribute,...f,...c,ref:t,style:{...c.style,"--radix-tooltip-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-tooltip-content-available-width":"var(--radix-popper-available-width)","--radix-tooltip-content-available-height":"var(--radix-popper-available-height)","--radix-tooltip-trigger-width":"var(--radix-popper-anchor-width)","--radix-tooltip-trigger-height":"var(--radix-popper-anchor-height)"},children:[i.jsx(Da,{children:r}),i.jsx(pc,{scope:n,isInside:!0,children:i.jsx(Ra,{id:l.contentId,role:"tooltip",children:o||r})})]})})});Ao.displayName=Ee;var Do="TooltipArrow",jo=u.forwardRef((e,t)=>{const{__scopeTooltip:n,...r}=e,o=rt(n);return hc(Do,n).isInside?null:i.jsx(lr,{...o,...r,ref:t})});jo.displayName=Do;function gc(e,t){const n=Math.abs(t.top-e.y),r=Math.abs(t.bottom-e.y),o=Math.abs(t.right-e.x),a=Math.abs(t.left-e.x);switch(Math.min(n,r,o,a)){case a:return"left";case o:return"right";case n:return"top";case r:return"bottom";default:throw new Error("unreachable")}}function mc(e,t,n=5){const r=[];switch(t){case"top":r.push({x:e.x-n,y:e.y+n},{x:e.x+n,y:e.y+n});break;case"bottom":r.push({x:e.x-n,y:e.y-n},{x:e.x+n,y:e.y-n});break;case"left":r.push({x:e.x+n,y:e.y-n},{x:e.x+n,y:e.y+n});break;case"right":r.push({x:e.x-n,y:e.y-n},{x:e.x-n,y:e.y+n});break}return r}function bc(e){const{top:t,right:n,bottom:r,left:o}=e;return[{x:o,y:t},{x:n,y:t},{x:n,y:r},{x:o,y:r}]}function vc(e,t){const{x:n,y:r}=e;let o=!1;for(let a=0,s=t.length-1;a<t.length;s=a++){const c=t[a].x,l=t[a].y,f=t[s].x,d=t[s].y;l>r!=d>r&&n<(f-c)*(r-l)/(d-l)+c&&(o=!o)}return o}function wc(e){const t=e.slice();return t.sort((n,r)=>n.x<r.x?-1:n.x>r.x?1:n.y<r.y?-1:n.y>r.y?1:0),yc(t)}function yc(e){if(e.length<=1)return e.slice();const t=[];for(let r=0;r<e.length;r++){const o=e[r];for(;t.length>=2;){const a=t[t.length-1],s=t[t.length-2];if((a.x-s.x)*(o.y-s.y)>=(a.y-s.y)*(o.x-s.x))t.pop();else break}t.push(o)}t.pop();const n=[];for(let r=e.length-1;r>=0;r--){const o=e[r];for(;n.length>=2;){const a=n[n.length-1],s=n[n.length-2];if((a.x-s.x)*(o.y-s.y)>=(a.y-s.y)*(o.x-s.x))n.pop();else break}n.push(o)}return n.pop(),t.length===1&&n.length===1&&t[0].x===n[0].x&&t[0].y===n[0].y?t:t.concat(n)}var xc=Co,_c=Eo,Cc=Io,Ec=So,Ic=Ao,Sc=jo;function Mo({delayDuration:e=0,...t}){return i.jsx(xc,{"data-slot":"tooltip-provider",delayDuration:e,...t})}function Ac({...e}){return i.jsx(Mo,{children:i.jsx(_c,{"data-slot":"tooltip",...e})})}function Tc({...e}){return i.jsx(Cc,{"data-slot":"tooltip-trigger",...e})}function Dc({className:e,sideOffset:t=4,children:n,...r}){return i.jsx(Ec,{children:i.jsxs(Ic,{"data-slot":"tooltip-content",sideOffset:t,className:C("bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-w-sm rounded-md px-3 py-1.5 text-xs",e),...r,children:[n,i.jsx(Sc,{className:"bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]"})]})})}const jc="sidebar_state",Mc=60*60*24*7,Nc="16rem",Rc="18rem",kc="3rem",Oc="b",No=u.createContext(null);function He(){const e=u.useContext(No);if(!e)throw new Error("useSidebar must be used within a SidebarProvider.");return e}function Pc({defaultOpen:e=!0,open:t,onOpenChange:n,className:r,style:o,children:a,...s}){const c=xo(),[l,f]=u.useState(!1),[d,p]=u.useState(e),g=t??d,h=u.useCallback(b=>{const w=typeof b=="function"?b(g):b;n?n(w):p(w),document.cookie=`${jc}=${w}; path=/; max-age=${Mc}`},[n,g]),m=u.useCallback(()=>c?f(b=>!b):h(b=>!b),[c,h,f]);u.useEffect(()=>{const b=w=>{w.key===Oc&&(w.metaKey||w.ctrlKey)&&(w.preventDefault(),m())};return window.addEventListener("keydown",b),()=>window.removeEventListener("keydown",b)},[m]);const y=g?"expanded":"collapsed",v=u.useMemo(()=>({state:y,open:g,setOpen:h,isMobile:c,openMobile:l,setOpenMobile:f,toggleSidebar:m}),[y,g,h,c,l,f,m]);return i.jsx(No.Provider,{value:v,children:i.jsx(Mo,{delayDuration:0,children:i.jsx("div",{"data-slot":"sidebar-wrapper",style:{"--sidebar-width":Nc,"--sidebar-width-icon":kc,...o},className:C("group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",r),...s,children:a})})})}function $c({side:e="left",variant:t="sidebar",collapsible:n="offcanvas",className:r,children:o,...a}){const{isMobile:s,state:c,openMobile:l,setOpenMobile:f}=He();return n==="none"?i.jsx("div",{"data-slot":"sidebar",className:C("bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",r),...a,children:o}):s?i.jsxs(vs,{open:l,onOpenChange:f,...a,children:[i.jsxs(_s,{className:"sr-only",children:[i.jsx(Cs,{children:"Sidebar"}),i.jsx(Es,{children:"Displays the mobile sidebar."})]}),i.jsx(xs,{"data-sidebar":"sidebar","data-slot":"sidebar","data-mobile":"true",className:"bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",style:{"--sidebar-width":Rc},side:e,children:i.jsx("div",{className:"flex h-full w-full flex-col",children:o})})]}):i.jsxs("div",{className:"group peer text-sidebar-foreground hidden md:block","data-state":c,"data-collapsible":c==="collapsed"?n:"","data-variant":t,"data-side":e,"data-slot":"sidebar",children:[i.jsx("div",{className:C("relative h-svh w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear","group-data-[collapsible=offcanvas]:w-0","group-data-[side=right]:rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]":"group-data-[collapsible=icon]:w-(--sidebar-width-icon)")}),i.jsx("div",{className:C("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",e==="left"?"left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]":"right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]":"group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",r),...a,children:i.jsx("div",{"data-sidebar":"sidebar",className:"bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",children:o})})]})}function Fc({className:e,onClick:t,...n}){const{toggleSidebar:r}=He();return i.jsxs(Bt,{"data-sidebar":"trigger","data-slot":"sidebar-trigger",variant:"ghost",size:"icon",className:C("h-7 w-7",e),onClick:o=>{t==null||t(o),r()},...n,children:[i.jsx(ds,{}),i.jsx("span",{className:"sr-only",children:"Toggle Sidebar"})]})}function Lc({className:e,...t}){return i.jsx("main",{"data-slot":"sidebar-inset",className:C("bg-background relative flex min-h-svh flex-1 flex-col","peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(4)))] md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0",e),...t})}function Bc({className:e,...t}){return i.jsx("div",{"data-slot":"sidebar-header","data-sidebar":"header",className:C("flex flex-col gap-2 p-2",e),...t})}function Hc({className:e,...t}){return i.jsx("div",{"data-slot":"sidebar-footer","data-sidebar":"footer",className:C("flex flex-col gap-2 p-2",e),...t})}function Uc({className:e,...t}){return i.jsx("div",{"data-slot":"sidebar-content","data-sidebar":"content",className:C("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",e),...t})}function Ro({className:e,...t}){return i.jsx("div",{"data-slot":"sidebar-group","data-sidebar":"group",className:C("relative flex w-full min-w-0 flex-col p-2",e),...t})}function Kc({className:e,asChild:t=!1,...n}){const r=t?Ie:"div";return i.jsx(r,{"data-slot":"sidebar-group-label","data-sidebar":"group-label",className:C("text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0","group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",e),...n})}function Gc({className:e,...t}){return i.jsx("div",{"data-slot":"sidebar-group-content","data-sidebar":"group-content",className:C("w-full text-sm",e),...t})}function at({className:e,...t}){return i.jsx("ul",{"data-slot":"sidebar-menu","data-sidebar":"menu",className:C("flex w-full min-w-0 flex-col gap-1",e),...t})}function Me({className:e,...t}){return i.jsx("li",{"data-slot":"sidebar-menu-item","data-sidebar":"menu-item",className:C("group/menu-item relative",e),...t})}const Vc=Qn("peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",{variants:{variant:{default:"hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",outline:"bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"h-8 text-sm",sm:"h-7 text-xs",lg:"h-12 text-sm group-data-[collapsible=icon]:p-0!"}},defaultVariants:{variant:"default",size:"default"}});function Ne({asChild:e=!1,isActive:t=!1,variant:n="default",size:r="default",tooltip:o,className:a,...s}){const c=e?Ie:"button",{isMobile:l,state:f}=He(),d=i.jsx(c,{"data-slot":"sidebar-menu-button","data-sidebar":"menu-button","data-size":r,"data-active":t,className:C(Vc({variant:n,size:r}),a),...s});return o?(typeof o=="string"&&(o={children:o}),i.jsxs(Ac,{children:[i.jsx(Tc,{asChild:!0,children:d}),i.jsx(Dc,{side:"right",align:"center",hidden:f!=="collapsed"||l,...o})]})):d}function zc({className:e,...t}){return i.jsx("ul",{"data-slot":"sidebar-menu-sub","data-sidebar":"menu-sub",className:C("border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5","group-data-[collapsible=icon]:hidden",e),...t})}function Wc({className:e,...t}){return i.jsx("li",{"data-slot":"sidebar-menu-sub-item","data-sidebar":"menu-sub-item",className:C("group/menu-sub-item relative",e),...t})}function qc({asChild:e=!1,size:t="md",isActive:n=!1,className:r,...o}){const a=e?Ie:"a";return i.jsx(a,{"data-slot":"sidebar-menu-sub-button","data-sidebar":"menu-sub-button","data-size":t,"data-active":n,className:C("text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0","data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",t==="sm"&&"text-xs",t==="md"&&"text-sm","group-data-[collapsible=icon]:hidden",r),...o})}function Yc({variant:e="header",children:t,...n}){return e==="sidebar"?i.jsx(Lc,{...n,children:t}):i.jsx("main",{className:"mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl",...n,children:t})}function Xc({children:e,variant:t="header"}){const[n,r]=u.useState(()=>typeof window<"u"?localStorage.getItem("sidebar")!=="false":!0),o=a=>{r(a),typeof window<"u"&&localStorage.setItem("sidebar",String(a))};return t==="header"?i.jsx("div",{className:"flex min-h-screen w-full flex-col",children:e}):i.jsx(Pc,{defaultOpen:n,open:n,onOpenChange:o,children:e})}function Jc({iconNode:e,className:t,...n}){return i.jsx(e,{className:C("h-4 w-4",t),...n})}function Zc({items:e,className:t,...n}){return i.jsx(Ro,{...n,className:`group-data-[collapsible=icon]:p-0 ${t||""}`,children:i.jsx(Gc,{children:i.jsx(at,{children:e.map(r=>i.jsx(Me,{children:i.jsx(Ne,{asChild:!0,tooltip:r.title,className:"text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100",children:i.jsxs(ne,{href:r.href,prefetch:!0,children:[r.icon&&i.jsx(Jc,{iconNode:r.icon,className:"h-5 w-5"}),i.jsx("span",{children:r.title})]})})},r.title))})})})}function Qc({items:e=[]}){return i.jsxs(Ro,{className:"px-2 py-0",children:[i.jsx(Kc,{children:"Bağlantılar"}),i.jsx(at,{children:e.map(t=>{var n;return t.items?i.jsx(on,{asChild:!0,defaultOpen:t.isActive,className:"group/collapsible",children:i.jsxs(Me,{children:[i.jsx(an,{asChild:!0,children:i.jsxs(Ne,{tooltip:t.title,children:[t.icon&&i.jsx(t.icon,{}),i.jsx("span",{children:t.title}),i.jsx(Na,{className:"ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"})]})}),i.jsx(cn,{children:i.jsx(zc,{children:(n=t.items)==null?void 0:n.map(r=>i.jsx(Wc,{children:i.jsx(qc,{asChild:!0,isActive:r.isActive,children:i.jsx(ne,{href:r.href,children:i.jsx("span",{children:r.title})})})},r.title))})})]})},t.title):i.jsx(Me,{children:i.jsx(Ne,{tooltip:t.title,isActive:t.isActive,asChild:!0,children:i.jsxs(ne,{href:t.href,children:[t.icon&&i.jsx(t.icon,{}),i.jsx("span",{children:t.title})]})})},t.title)})})]})}var fn="Avatar",[el,Yf]=me(fn),[tl,ko]=el(fn),Oo=u.forwardRef((e,t)=>{const{__scopeAvatar:n,...r}=e,[o,a]=u.useState("idle");return i.jsx(tl,{scope:n,imageLoadingStatus:o,onImageLoadingStatusChange:a,children:i.jsx(S.span,{...r,ref:t})})});Oo.displayName=fn;var Po="AvatarImage",$o=u.forwardRef((e,t)=>{const{__scopeAvatar:n,src:r,onLoadingStatusChange:o=()=>{},...a}=e,s=ko(Po,n),c=nl(r,a.referrerPolicy),l=Je(f=>{o(f),s.onImageLoadingStatusChange(f)});return Kt(()=>{c!=="idle"&&l(c)},[c,l]),c==="loaded"?i.jsx(S.img,{...a,ref:t,src:r}):null});$o.displayName=Po;var Fo="AvatarFallback",Lo=u.forwardRef((e,t)=>{const{__scopeAvatar:n,delayMs:r,...o}=e,a=ko(Fo,n),[s,c]=u.useState(r===void 0);return u.useEffect(()=>{if(r!==void 0){const l=window.setTimeout(()=>c(!0),r);return()=>window.clearTimeout(l)}},[r]),s&&a.imageLoadingStatus!=="loaded"?i.jsx(S.span,{...o,ref:t}):null});Lo.displayName=Fo;function nl(e,t){const[n,r]=u.useState("idle");return Kt(()=>{if(!e){r("error");return}let o=!0;const a=new window.Image,s=c=>()=>{o&&r(c)};return r("loading"),a.onload=s("loaded"),a.onerror=s("error"),a.src=e,t&&(a.referrerPolicy=t),()=>{o=!1}},[e,t]),n}var rl=Oo,ol=$o,al=Lo;function sl({className:e,...t}){return i.jsx(rl,{"data-slot":"avatar",className:C("relative flex size-8 shrink-0 overflow-hidden rounded-full",e),...t})}function il({className:e,...t}){return i.jsx(ol,{"data-slot":"avatar-image",className:C("aspect-square size-full",e),...t})}function cl({className:e,...t}){return i.jsx(al,{"data-slot":"avatar-fallback",className:C("bg-muted flex size-full items-center justify-center rounded-full",e),...t})}function ll(){return u.useCallback(t=>{const n=t.trim().split(" ");if(n.length===0)return"";if(n.length===1)return n[0].charAt(0).toUpperCase();const r=n[0].charAt(0),o=n[n.length-1].charAt(0);return`${r}${o}`.toUpperCase()},[])}function Bo({user:e,showEmail:t=!1}){const n=ll();return i.jsxs(i.Fragment,{children:[i.jsxs(sl,{className:"h-8 w-8 overflow-hidden rounded-full",children:[i.jsx(il,{src:e.avatar,alt:e.name}),i.jsx(cl,{className:"rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white",children:n(e.name)})]}),i.jsxs("div",{className:"grid flex-1 text-left text-sm leading-tight",children:[i.jsx("span",{className:"truncate font-medium",children:e.name}),t&&i.jsx("span",{className:"text-muted-foreground truncate text-xs",children:e.email})]})]})}function ul(){return u.useCallback(()=>{document.body.style.removeProperty("pointer-events")},[])}function dl({user:e}){const t=ul();return i.jsxs(i.Fragment,{children:[i.jsx(rc,{className:"p-0 font-normal",children:i.jsx("div",{className:"flex items-center gap-2 px-1 py-1.5 text-left text-sm",children:i.jsx(Bo,{user:e,showEmail:!0})})}),i.jsx(Mn,{}),i.jsxs(nc,{children:[i.jsx(_e,{asChild:!0,children:i.jsxs(ne,{className:"block w-full",href:route("notifications.index"),as:"button",prefetch:!0,onClick:t,children:[i.jsx(Ar,{className:"mr-2"}),"Bildirimler"]})}),i.jsx(_e,{asChild:!0,children:i.jsxs(ne,{className:"block w-full",href:route("profile.edit"),as:"button",prefetch:!0,onClick:t,children:[i.jsx(Tt,{className:"mr-2"}),"Ayarlar"]})})]}),i.jsx(Mn,{}),i.jsx(_e,{asChild:!0,children:i.jsxs(ne,{className:"block w-full",method:"post",href:route("logout"),as:"button",onClick:t,children:[i.jsx(as,{className:"mr-2"}),"Çıkış Yap"]})})]})}function fl(){const{auth:e}=fe().props,{state:t}=He(),n=xo();return i.jsx(at,{children:i.jsx(Me,{children:i.jsxs(bo,{children:[i.jsx(vo,{asChild:!0,children:i.jsxs(Ne,{size:"lg",className:"text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent group",children:[i.jsx(Bo,{user:e.user}),i.jsx(ts,{className:"ml-auto size-4"})]})}),i.jsx(wo,{className:"w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg",align:"end",side:n?"bottom":t==="collapsed"?"left":"bottom",children:i.jsx(dl,{user:e.user})})]})})})}const Ho=u.createContext({permissions:[],hasPermission:()=>!1,hasAnyPermission:()=>!1,hasAllPermissions:()=>!1,user:null,roles:[],hasRole:()=>!1}),pl=({children:e})=>{var g;const t=fe().props,[n,r]=u.useState(t.auth);u.useEffect(()=>{var h;(h=t.auth)!=null&&h.user&&r(t.auth)},[t.auth]);const o=n.user,a=n.permissions||[],s=((g=o==null?void 0:o.roles)==null?void 0:g.map(h=>h.name))||[],p={permissions:a,hasPermission:h=>a.includes(h),hasAnyPermission:h=>h.some(m=>a.includes(m)),hasAllPermissions:h=>h.every(m=>a.includes(m)),user:o,roles:s,hasRole:h=>s.includes(h)};return i.jsx(Ho.Provider,{value:p,children:e})},hl=()=>{const e=u.useContext(Ho);if(e===void 0)throw new Error("usePermission must be used within a PermissionProvider");return e};function P(){return P=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},P.apply(null,arguments)}var gl=String.prototype.replace,ml=/%20/g,bl="RFC3986",Ce={default:bl,formatters:{RFC1738:function(e){return gl.call(e,ml,"+")},RFC3986:function(e){return String(e)}},RFC1738:"RFC1738"},mt=Object.prototype.hasOwnProperty,ce=Array.isArray,V=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),Nn=function(e,t){for(var n=t&&t.plainObjects?Object.create(null):{},r=0;r<e.length;++r)e[r]!==void 0&&(n[r]=e[r]);return n},te={arrayToObject:Nn,assign:function(e,t){return Object.keys(t).reduce(function(n,r){return n[r]=t[r],n},e)},combine:function(e,t){return[].concat(e,t)},compact:function(e){for(var t=[{obj:{o:e},prop:"o"}],n=[],r=0;r<t.length;++r)for(var o=t[r],a=o.obj[o.prop],s=Object.keys(a),c=0;c<s.length;++c){var l=s[c],f=a[l];typeof f=="object"&&f!==null&&n.indexOf(f)===-1&&(t.push({obj:a,prop:l}),n.push(f))}return function(d){for(;d.length>1;){var p=d.pop(),g=p.obj[p.prop];if(ce(g)){for(var h=[],m=0;m<g.length;++m)g[m]!==void 0&&h.push(g[m]);p.obj[p.prop]=h}}}(t),e},decode:function(e,t,n){var r=e.replace(/\+/g," ");if(n==="iso-8859-1")return r.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(r)}catch{return r}},encode:function(e,t,n,r,o){if(e.length===0)return e;var a=e;if(typeof e=="symbol"?a=Symbol.prototype.toString.call(e):typeof e!="string"&&(a=String(e)),n==="iso-8859-1")return escape(a).replace(/%u[0-9a-f]{4}/gi,function(f){return"%26%23"+parseInt(f.slice(2),16)+"%3B"});for(var s="",c=0;c<a.length;++c){var l=a.charCodeAt(c);l===45||l===46||l===95||l===126||l>=48&&l<=57||l>=65&&l<=90||l>=97&&l<=122||o===Ce.RFC1738&&(l===40||l===41)?s+=a.charAt(c):l<128?s+=V[l]:l<2048?s+=V[192|l>>6]+V[128|63&l]:l<55296||l>=57344?s+=V[224|l>>12]+V[128|l>>6&63]+V[128|63&l]:(l=65536+((1023&l)<<10|1023&a.charCodeAt(c+=1)),s+=V[240|l>>18]+V[128|l>>12&63]+V[128|l>>6&63]+V[128|63&l])}return s},isBuffer:function(e){return!(!e||typeof e!="object"||!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e)))},isRegExp:function(e){return Object.prototype.toString.call(e)==="[object RegExp]"},maybeMap:function(e,t){if(ce(e)){for(var n=[],r=0;r<e.length;r+=1)n.push(t(e[r]));return n}return t(e)},merge:function e(t,n,r){if(!n)return t;if(typeof n!="object"){if(ce(t))t.push(n);else{if(!t||typeof t!="object")return[t,n];(r&&(r.plainObjects||r.allowPrototypes)||!mt.call(Object.prototype,n))&&(t[n]=!0)}return t}if(!t||typeof t!="object")return[t].concat(n);var o=t;return ce(t)&&!ce(n)&&(o=Nn(t,r)),ce(t)&&ce(n)?(n.forEach(function(a,s){if(mt.call(t,s)){var c=t[s];c&&typeof c=="object"&&a&&typeof a=="object"?t[s]=e(c,a,r):t.push(a)}else t[s]=a}),t):Object.keys(n).reduce(function(a,s){var c=n[s];return a[s]=mt.call(a,s)?e(a[s],c,r):c,a},o)}},vl=Object.prototype.hasOwnProperty,Rn={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},ue=Array.isArray,wl=String.prototype.split,yl=Array.prototype.push,Uo=function(e,t){yl.apply(e,ue(t)?t:[t])},xl=Date.prototype.toISOString,kn=Ce.default,M={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:te.encode,encodeValuesOnly:!1,format:kn,formatter:Ce.formatters[kn],indices:!1,serializeDate:function(e){return xl.call(e)},skipNulls:!1,strictNullHandling:!1},_l=function e(t,n,r,o,a,s,c,l,f,d,p,g,h,m){var y,v=t;if(typeof c=="function"?v=c(n,v):v instanceof Date?v=d(v):r==="comma"&&ue(v)&&(v=te.maybeMap(v,function(W){return W instanceof Date?d(W):W})),v===null){if(o)return s&&!h?s(n,M.encoder,m,"key",p):n;v=""}if(typeof(y=v)=="string"||typeof y=="number"||typeof y=="boolean"||typeof y=="symbol"||typeof y=="bigint"||te.isBuffer(v)){if(s){var b=h?n:s(n,M.encoder,m,"key",p);if(r==="comma"&&h){for(var w=wl.call(String(v),","),E="",A=0;A<w.length;++A)E+=(A===0?"":",")+g(s(w[A],M.encoder,m,"value",p));return[g(b)+"="+E]}return[g(b)+"="+g(s(v,M.encoder,m,"value",p))]}return[g(n)+"="+g(String(v))]}var T,H=[];if(v===void 0)return H;if(r==="comma"&&ue(v))T=[{value:v.length>0?v.join(",")||null:void 0}];else if(ue(c))T=c;else{var O=Object.keys(v);T=l?O.sort(l):O}for(var D=0;D<T.length;++D){var k=T[D],K=typeof k=="object"&&k.value!==void 0?k.value:v[k];if(!a||K!==null){var ie=ue(v)?typeof r=="function"?r(n,k):n:n+(f?"."+k:"["+k+"]");Uo(H,e(K,ie,r,o,a,s,c,l,f,d,p,g,h,m))}}return H},Rt=Object.prototype.hasOwnProperty,Cl=Array.isArray,Ge={allowDots:!1,allowPrototypes:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:te.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},El=function(e){return e.replace(/&#(\d+);/g,function(t,n){return String.fromCharCode(parseInt(n,10))})},Ko=function(e,t){return e&&typeof e=="string"&&t.comma&&e.indexOf(",")>-1?e.split(","):e},Il=function(e,t,n,r){if(e){var o=n.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,a=/(\[[^[\]]*])/g,s=n.depth>0&&/(\[[^[\]]*])/.exec(o),c=s?o.slice(0,s.index):o,l=[];if(c){if(!n.plainObjects&&Rt.call(Object.prototype,c)&&!n.allowPrototypes)return;l.push(c)}for(var f=0;n.depth>0&&(s=a.exec(o))!==null&&f<n.depth;){if(f+=1,!n.plainObjects&&Rt.call(Object.prototype,s[1].slice(1,-1))&&!n.allowPrototypes)return;l.push(s[1])}return s&&l.push("["+o.slice(s.index)+"]"),function(d,p,g,h){for(var m=h?p:Ko(p,g),y=d.length-1;y>=0;--y){var v,b=d[y];if(b==="[]"&&g.parseArrays)v=[].concat(m);else{v=g.plainObjects?Object.create(null):{};var w=b.charAt(0)==="["&&b.charAt(b.length-1)==="]"?b.slice(1,-1):b,E=parseInt(w,10);g.parseArrays||w!==""?!isNaN(E)&&b!==w&&String(E)===w&&E>=0&&g.parseArrays&&E<=g.arrayLimit?(v=[])[E]=m:w!=="__proto__"&&(v[w]=m):v={0:m}}m=v}return m}(l,t,n,r)}},Sl=function(e,t){var n=function(f){return Ge}();if(e===""||e==null)return n.plainObjects?Object.create(null):{};for(var r=typeof e=="string"?function(f,d){var p,g={},h=(d.ignoreQueryPrefix?f.replace(/^\?/,""):f).split(d.delimiter,d.parameterLimit===1/0?void 0:d.parameterLimit),m=-1,y=d.charset;if(d.charsetSentinel)for(p=0;p<h.length;++p)h[p].indexOf("utf8=")===0&&(h[p]==="utf8=%E2%9C%93"?y="utf-8":h[p]==="utf8=%26%2310003%3B"&&(y="iso-8859-1"),m=p,p=h.length);for(p=0;p<h.length;++p)if(p!==m){var v,b,w=h[p],E=w.indexOf("]="),A=E===-1?w.indexOf("="):E+1;A===-1?(v=d.decoder(w,Ge.decoder,y,"key"),b=d.strictNullHandling?null:""):(v=d.decoder(w.slice(0,A),Ge.decoder,y,"key"),b=te.maybeMap(Ko(w.slice(A+1),d),function(T){return d.decoder(T,Ge.decoder,y,"value")})),b&&d.interpretNumericEntities&&y==="iso-8859-1"&&(b=El(b)),w.indexOf("[]=")>-1&&(b=Cl(b)?[b]:b),g[v]=Rt.call(g,v)?te.combine(g[v],b):b}return g}(e,n):e,o=n.plainObjects?Object.create(null):{},a=Object.keys(r),s=0;s<a.length;++s){var c=a[s],l=Il(c,r[c],n,typeof e=="string");o=te.merge(o,l,n)}return te.compact(o)};class bt{constructor(t,n,r){var o,a;this.name=t,this.definition=n,this.bindings=(o=n.bindings)!=null?o:{},this.wheres=(a=n.wheres)!=null?a:{},this.config=r}get template(){const t=`${this.origin}/${this.definition.uri}`.replace(/\/+$/,"");return t===""?"/":t}get origin(){return this.config.absolute?this.definition.domain?`${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port?`:${this.config.port}`:""}`:this.config.url:""}get parameterSegments(){var t,n;return(t=(n=this.template.match(/{[^}?]+\??}/g))==null?void 0:n.map(r=>({name:r.replace(/{|\??}/g,""),required:!/\?}$/.test(r)})))!=null?t:[]}matchesUrl(t){var n;if(!this.definition.methods.includes("GET"))return!1;const r=this.template.replace(/[.*+$()[\]]/g,"\\$&").replace(/(\/?){([^}?]*)(\??)}/g,(c,l,f,d)=>{var p;const g=`(?<${f}>${((p=this.wheres[f])==null?void 0:p.replace(/(^\^)|(\$$)/g,""))||"[^/?]+"})`;return d?`(${l}${g})?`:`${l}${g}`}).replace(/^\w+:\/\//,""),[o,a]=t.replace(/^\w+:\/\//,"").split("?"),s=(n=new RegExp(`^${r}/?$`).exec(o))!=null?n:new RegExp(`^${r}/?$`).exec(decodeURI(o));if(s){for(const c in s.groups)s.groups[c]=typeof s.groups[c]=="string"?decodeURIComponent(s.groups[c]):s.groups[c];return{params:s.groups,query:Sl(a)}}return!1}compile(t){return this.parameterSegments.length?this.template.replace(/{([^}?]+)(\??)}/g,(n,r,o)=>{var a,s;if(!o&&[null,void 0].includes(t[r]))throw new Error(`Ziggy error: '${r}' parameter is required for route '${this.name}'.`);if(this.wheres[r]&&!new RegExp(`^${o?`(${this.wheres[r]})?`:this.wheres[r]}$`).test((s=t[r])!=null?s:""))throw new Error(`Ziggy error: '${r}' parameter '${t[r]}' does not match required format '${this.wheres[r]}' for route '${this.name}'.`);return encodeURI((a=t[r])!=null?a:"").replace(/%7C/g,"|").replace(/%25/g,"%").replace(/\$/g,"%24")}).replace(this.config.absolute?/(\.[^/]+?)(\/\/)/:/(^)(\/\/)/,"$1/").replace(/\/+$/,""):this.template}}class Al extends String{constructor(t,n,r=!0,o){if(super(),this.t=o??(typeof Ziggy<"u"?Ziggy:globalThis==null?void 0:globalThis.Ziggy),this.t=P({},this.t,{absolute:r}),t){if(!this.t.routes[t])throw new Error(`Ziggy error: route '${t}' is not in the route list.`);this.i=new bt(t,this.t.routes[t],this.t),this.u=this.l(n)}}toString(){const t=Object.keys(this.u).filter(n=>!this.i.parameterSegments.some(({name:r})=>r===n)).filter(n=>n!=="_query").reduce((n,r)=>P({},n,{[r]:this.u[r]}),{});return this.i.compile(this.u)+function(n,r){var o,a=n,s=function(h){if(!h)return M;if(h.encoder!=null&&typeof h.encoder!="function")throw new TypeError("Encoder has to be a function.");var m=h.charset||M.charset;if(h.charset!==void 0&&h.charset!=="utf-8"&&h.charset!=="iso-8859-1")throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var y=Ce.default;if(h.format!==void 0){if(!vl.call(Ce.formatters,h.format))throw new TypeError("Unknown format option provided.");y=h.format}var v=Ce.formatters[y],b=M.filter;return(typeof h.filter=="function"||ue(h.filter))&&(b=h.filter),{addQueryPrefix:typeof h.addQueryPrefix=="boolean"?h.addQueryPrefix:M.addQueryPrefix,allowDots:h.allowDots===void 0?M.allowDots:!!h.allowDots,charset:m,charsetSentinel:typeof h.charsetSentinel=="boolean"?h.charsetSentinel:M.charsetSentinel,delimiter:h.delimiter===void 0?M.delimiter:h.delimiter,encode:typeof h.encode=="boolean"?h.encode:M.encode,encoder:typeof h.encoder=="function"?h.encoder:M.encoder,encodeValuesOnly:typeof h.encodeValuesOnly=="boolean"?h.encodeValuesOnly:M.encodeValuesOnly,filter:b,format:y,formatter:v,serializeDate:typeof h.serializeDate=="function"?h.serializeDate:M.serializeDate,skipNulls:typeof h.skipNulls=="boolean"?h.skipNulls:M.skipNulls,sort:typeof h.sort=="function"?h.sort:null,strictNullHandling:typeof h.strictNullHandling=="boolean"?h.strictNullHandling:M.strictNullHandling}}(r);typeof s.filter=="function"?a=(0,s.filter)("",a):ue(s.filter)&&(o=s.filter);var c=[];if(typeof a!="object"||a===null)return"";var l=Rn[r&&r.arrayFormat in Rn?r.arrayFormat:r&&"indices"in r?r.indices?"indices":"repeat":"indices"];o||(o=Object.keys(a)),s.sort&&o.sort(s.sort);for(var f=0;f<o.length;++f){var d=o[f];s.skipNulls&&a[d]===null||Uo(c,_l(a[d],d,l,s.strictNullHandling,s.skipNulls,s.encode?s.encoder:null,s.filter,s.sort,s.allowDots,s.serializeDate,s.format,s.formatter,s.encodeValuesOnly,s.charset))}var p=c.join(s.delimiter),g=s.addQueryPrefix===!0?"?":"";return s.charsetSentinel&&(g+=s.charset==="iso-8859-1"?"utf8=%26%2310003%3B&":"utf8=%E2%9C%93&"),p.length>0?g+p:""}(P({},t,this.u._query),{addQueryPrefix:!0,arrayFormat:"indices",encodeValuesOnly:!0,skipNulls:!0,encoder:(n,r)=>typeof n=="boolean"?Number(n):r(n)})}p(t){t?this.t.absolute&&t.startsWith("/")&&(t=this.h().host+t):t=this.v();let n={};const[r,o]=Object.entries(this.t.routes).find(([a,s])=>n=new bt(a,s,this.t).matchesUrl(t))||[void 0,void 0];return P({name:r},n,{route:o})}v(){const{host:t,pathname:n,search:r}=this.h();return(this.t.absolute?t+n:n.replace(this.t.url.replace(/^\w*:\/\/[^/]+/,""),"").replace(/^\/+/,"/"))+r}current(t,n){const{name:r,params:o,query:a,route:s}=this.p();if(!t)return r;const c=new RegExp(`^${t.replace(/\./g,"\\.").replace(/\*/g,".*")}$`).test(r);if([null,void 0].includes(n)||!c)return c;const l=new bt(r,s,this.t);n=this.l(n,l);const f=P({},o,a);if(Object.values(n).every(p=>!p)&&!Object.values(f).some(p=>p!==void 0))return!0;const d=(p,g)=>Object.entries(p).every(([h,m])=>Array.isArray(m)&&Array.isArray(g[h])?m.every(y=>g[h].includes(y)):typeof m=="object"&&typeof g[h]=="object"&&m!==null&&g[h]!==null?d(m,g[h]):g[h]==m);return d(n,f)}h(){var t,n,r,o,a,s;const{host:c="",pathname:l="",search:f=""}=typeof window<"u"?window.location:{};return{host:(t=(n=this.t.location)==null?void 0:n.host)!=null?t:c,pathname:(r=(o=this.t.location)==null?void 0:o.pathname)!=null?r:l,search:(a=(s=this.t.location)==null?void 0:s.search)!=null?a:f}}get params(){const{params:t,query:n}=this.p();return P({},t,n)}get routeParams(){return this.p().params}get queryParams(){return this.p().query}has(t){return this.t.routes.hasOwnProperty(t)}l(t={},n=this.i){t!=null||(t={}),t=["string","number"].includes(typeof t)?[t]:t;const r=n.parameterSegments.filter(({name:o})=>!this.t.defaults[o]);return Array.isArray(t)?t=t.reduce((o,a,s)=>P({},o,r[s]?{[r[s].name]:a}:typeof a=="object"?a:{[a]:""}),{}):r.length!==1||t[r[0].name]||!t.hasOwnProperty(Object.values(n.bindings)[0])&&!t.hasOwnProperty("id")||(t={[r[0].name]:t}),P({},this.m(n),this.j(t,n))}m(t){return t.parameterSegments.filter(({name:n})=>this.t.defaults[n]).reduce((n,{name:r},o)=>P({},n,{[r]:this.t.defaults[r]}),{})}j(t,{bindings:n,parameterSegments:r}){return Object.entries(t).reduce((o,[a,s])=>{if(!s||typeof s!="object"||Array.isArray(s)||!r.some(({name:c})=>c===a))return P({},o,{[a]:s});if(!s.hasOwnProperty(n[a])){if(!s.hasOwnProperty("id"))throw new Error(`Ziggy error: object passed as '${a}' parameter is missing route model binding key '${n[a]}'.`);n[a]="id"}return P({},o,{[a]:s[n[a]]})},{})}valueOf(){return this.toString()}}function j(e,t,n,r){const o=new Al(e,t,n,r);return e?o.toString():o}const Tl=[{title:"Dışa Aktarılan Dosyalar",href:j("exported-files.index"),icon:rs,permission:"exported_files.unkown"}];function Dl(){const{quote:e}=fe().props,{open:t}=He(),{hasPermission:n}=hl(),{auth:r}=fe().props,o=r.user.roles.some(d=>d.name==="dealer"),a=[{title:"Ana Sayfa",href:j("dashboard",void 0,!1),icon:Sn,permission:"customers.view",isActive:j().current("dashboard")},{title:"Kullanıcı Yönetimi",href:j("user_management.index",void 0,!1),icon:gs,permission:"user_management.view",isActive:j().current("user_management.*")},{title:"Bayi Yönetimi",href:j("admin.dealers.index",void 0,!1),icon:Pa,permission:"dealer.view",isActive:j().current("admin.dealers.*")},{title:"Ürün Yönetimi",href:j("admin.products.index",void 0,!1),icon:ls,permission:"product.view",isActive:j().current("admin.products.*")},{title:"Hizmet Yönetimi",href:j("admin.services.index",void 0,!1),icon:Tt,permission:"service.view_all",isActive:j().current("admin.services.*")}],s=[{title:"Ana Sayfa",href:j("dashboard",void 0,!1),icon:Sn,isActive:j().current("dashboard")},{title:"Hizmetlerim",href:j("dealer.services.index",void 0,!1),icon:Tt,permission:"service.view_own",isActive:j().current("dealer.services.*")},{title:"Hizmet Sorgu",href:j("dealer.service-inquiry.index",void 0,!1),icon:Oa,permission:"service.view_own",isActive:j().current("dealer.service-inquiry.*")}],l=(o?s:a).map(d=>d.permission&&n(d.permission)?(d.items&&d.items.length>0&&(d.items=d.items.filter(p=>p.permission&&n(p.permission))),d):d.permission?void 0:d).filter(d=>d!==void 0),f=Tl.map(d=>{if(d.permission&&n(d.permission))return d}).filter(d=>d!==void 0);return i.jsxs($c,{collapsible:"icon",variant:"inset",children:[i.jsx(Bc,{children:i.jsx(at,{children:i.jsx(Me,{children:i.jsx(Ne,{size:"lg",asChild:!0,tooltip:"Glorian",children:i.jsxs(ne,{href:j("dashboard",void 0,!1),prefetch:!0,children:[i.jsx("img",{src:"/logos/glorian-dark-logo.svg",alt:"Glorian Logo",className:"h-10 w-auto mx-auto dark:block hidden"}),i.jsx("img",{src:"/logos/glorian-light-logo.svg",alt:"Glorian Logo",className:"h-10 w-auto mx-auto dark:hidden"})]})})})})}),i.jsx(Uc,{children:i.jsx(Qc,{items:l})}),i.jsxs(Hc,{children:[i.jsx(Zc,{items:f,className:"mt-auto"}),i.jsx(fl,{})]})]})}function jl({initialCount:e=0}){const[t,n]=u.useState(e),r=fe().props.auth.unreadNotificationsCount;return u.useEffect(()=>{const a=setInterval(async()=>{try{const s=await Aa.get(route("notifications.unread-count"));n(s.data.count)}catch(s){console.error("Bildirim sayısı alınamadı:",s)}},6e4);return()=>clearInterval(a)},[]),u.useEffect(()=>{n(r)},[r]),i.jsx(ne,{href:route("notifications.index"),className:"relative inline-flex items-center justify-center",children:i.jsxs(Bt,{variant:"ghost",size:"icon",className:"h-9 w-9 rounded-md",children:[i.jsx(Ar,{className:"h-5 w-5"}),i.jsx("span",{className:"sr-only",children:"Toggle theme"}),t>0&&i.jsx(Ss,{variant:"destructive",className:"absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center p-0 text-xs",children:t>99?"99+":t})]})})}function Ml({className:e="",...t}){const{appearance:n,updateAppearance:r}=Ta(),o=()=>{switch(n){case"dark":return i.jsx(Tn,{className:"h-5 w-5"});case"light":return i.jsx(Dn,{className:"h-5 w-5"});default:return i.jsx(An,{className:"h-5 w-5"})}};return i.jsx("div",{className:e,...t,children:i.jsxs(bo,{children:[i.jsx(vo,{asChild:!0,children:i.jsxs(Bt,{variant:"ghost",size:"icon",className:"h-9 w-9 rounded-md",children:[o(),i.jsx("span",{className:"sr-only",children:"Toggle theme"})]})}),i.jsxs(wo,{align:"end",children:[i.jsx(_e,{onClick:()=>r("light"),children:i.jsxs("span",{className:"flex items-center gap-2",children:[i.jsx(Dn,{className:"h-5 w-5"}),"Açık"]})}),i.jsx(_e,{onClick:()=>r("dark"),children:i.jsxs("span",{className:"flex items-center gap-2",children:[i.jsx(Tn,{className:"h-5 w-5"}),"Koyu"]})}),i.jsx(_e,{onClick:()=>r("system"),children:i.jsxs("span",{className:"flex items-center gap-2",children:[i.jsx(An,{className:"h-5 w-5"}),"Sistem"]})})]})]})})}function Nl({breadcrumbs:e=[]}){const{auth:t}=fe().props,n=(t==null?void 0:t.unreadNotificationsCount)||0;return i.jsxs("header",{className:"border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4",children:[i.jsx("div",{className:"flex items-center gap-2",children:i.jsx(Fc,{className:"-ml-1"})}),i.jsxs("div",{className:"ml-auto flex items-center gap-4",children:[i.jsx(Ml,{}),i.jsx(jl,{initialCount:n})]})]})}function Rl({children:e,breadcrumbs:t=[]}){return i.jsxs(Xc,{variant:"sidebar",children:[i.jsx(Dl,{}),i.jsxs(Yc,{variant:"sidebar",children:[i.jsx(Nl,{breadcrumbs:t}),i.jsx("div",{className:"max-w-svw overflow-x-auto",children:e})]})]})}const kl=()=>{};var On={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Go=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let o=e.charCodeAt(r);o<128?t[n++]=o:o<2048?(t[n++]=o>>6|192,t[n++]=o&63|128):(o&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(o=65536+((o&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=o>>18|240,t[n++]=o>>12&63|128,t[n++]=o>>6&63|128,t[n++]=o&63|128):(t[n++]=o>>12|224,t[n++]=o>>6&63|128,t[n++]=o&63|128)}return t},Ol=function(e){const t=[];let n=0,r=0;for(;n<e.length;){const o=e[n++];if(o<128)t[r++]=String.fromCharCode(o);else if(o>191&&o<224){const a=e[n++];t[r++]=String.fromCharCode((o&31)<<6|a&63)}else if(o>239&&o<365){const a=e[n++],s=e[n++],c=e[n++],l=((o&7)<<18|(a&63)<<12|(s&63)<<6|c&63)-65536;t[r++]=String.fromCharCode(55296+(l>>10)),t[r++]=String.fromCharCode(56320+(l&1023))}else{const a=e[n++],s=e[n++];t[r++]=String.fromCharCode((o&15)<<12|(a&63)<<6|s&63)}}return t.join("")},Vo={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let o=0;o<e.length;o+=3){const a=e[o],s=o+1<e.length,c=s?e[o+1]:0,l=o+2<e.length,f=l?e[o+2]:0,d=a>>2,p=(a&3)<<4|c>>4;let g=(c&15)<<2|f>>6,h=f&63;l||(h=64,s||(g=64)),r.push(n[d],n[p],n[g],n[h])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(Go(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):Ol(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let o=0;o<e.length;){const a=n[e.charAt(o++)],c=o<e.length?n[e.charAt(o)]:0;++o;const f=o<e.length?n[e.charAt(o)]:64;++o;const p=o<e.length?n[e.charAt(o)]:64;if(++o,a==null||c==null||f==null||p==null)throw new Pl;const g=a<<2|c>>4;if(r.push(g),f!==64){const h=c<<4&240|f>>2;if(r.push(h),p!==64){const m=f<<6&192|p;r.push(m)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class Pl extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const $l=function(e){const t=Go(e);return Vo.encodeByteArray(t,!0)},zo=function(e){return $l(e).replace(/\./g,"")},Fl=function(e){try{return Vo.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ll(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bl=()=>Ll().__FIREBASE_DEFAULTS__,Hl=()=>{if(typeof process>"u"||typeof On>"u")return;const e=On.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},Ul=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=e&&Fl(e[1]);return t&&JSON.parse(t)},Kl=()=>{try{return kl()||Bl()||Hl()||Ul()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},Wo=()=>{var e;return(e=Kl())===null||e===void 0?void 0:e.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gl{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,r))}}}function qo(){try{return typeof indexedDB=="object"}catch{return!1}}function Yo(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",o=self.indexedDB.open(r);o.onsuccess=()=>{o.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},o.onupgradeneeded=()=>{n=!1},o.onerror=()=>{var a;t(((a=o.error)===null||a===void 0?void 0:a.message)||"")}}catch(n){t(n)}})}function Vl(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zl="FirebaseError";class we extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=zl,Object.setPrototypeOf(this,we.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,st.prototype.create)}}class st{constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){const r=n[0]||{},o=`${this.service}/${t}`,a=this.errors[t],s=a?Wl(a,r):"Error",c=`${this.serviceName}: ${s} (${o}).`;return new we(o,c,r)}}function Wl(e,t){return e.replace(ql,(n,r)=>{const o=t[r];return o!=null?String(o):`<${r}?>`})}const ql=/\{\$([^}]+)}/g;function kt(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const o of n){if(!r.includes(o))return!1;const a=e[o],s=t[o];if(Pn(a)&&Pn(s)){if(!kt(a,s))return!1}else if(a!==s)return!1}for(const o of r)if(!n.includes(o))return!1;return!0}function Pn(e){return e!==null&&typeof e=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pn(e){return e&&e._delegate?e._delegate:e}class ae{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const le="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yl{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const r=new Gl;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const o=this.getOrInitializeService({instanceIdentifier:n});o&&r.resolve(o)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){var n;const r=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),o=(n=t==null?void 0:t.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(a){if(o)return null;throw a}else{if(o)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Jl(t))try{this.getOrInitializeService({instanceIdentifier:le})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(n);try{const a=this.getOrInitializeService({instanceIdentifier:o});r.resolve(a)}catch{}}}}clearInstance(t=le){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=le){return this.instances.has(t)}getOptions(t=le){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const o=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[a,s]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(a);r===c&&s.resolve(o)}return o}onInit(t,n){var r;const o=this.normalizeInstanceIdentifier(n),a=(r=this.onInitCallbacks.get(o))!==null&&r!==void 0?r:new Set;a.add(t),this.onInitCallbacks.set(o,a);const s=this.instances.get(o);return s&&t(s,o),()=>{a.delete(t)}}invokeOnInitCallbacks(t,n){const r=this.onInitCallbacks.get(n);if(r)for(const o of r)try{o(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Xl(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=le){return this.component?this.component.multipleInstances?t:le:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Xl(e){return e===le?void 0:e}function Jl(e){return e.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zl{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const n=new Yl(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var I;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(I||(I={}));const Ql={debug:I.DEBUG,verbose:I.VERBOSE,info:I.INFO,warn:I.WARN,error:I.ERROR,silent:I.SILENT},eu=I.INFO,tu={[I.DEBUG]:"log",[I.VERBOSE]:"log",[I.INFO]:"info",[I.WARN]:"warn",[I.ERROR]:"error"},nu=(e,t,...n)=>{if(t<e.logLevel)return;const r=new Date().toISOString(),o=tu[t];if(o)console[o](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class ru{constructor(t){this.name=t,this._logLevel=eu,this._logHandler=nu,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in I))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Ql[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,I.DEBUG,...t),this._logHandler(this,I.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,I.VERBOSE,...t),this._logHandler(this,I.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,I.INFO,...t),this._logHandler(this,I.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,I.WARN,...t),this._logHandler(this,I.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,I.ERROR,...t),this._logHandler(this,I.ERROR,...t)}}const ou=(e,t)=>t.some(n=>e instanceof n);let $n,Fn;function au(){return $n||($n=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function su(){return Fn||(Fn=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Xo=new WeakMap,Ot=new WeakMap,Jo=new WeakMap,vt=new WeakMap,hn=new WeakMap;function iu(e){const t=new Promise((n,r)=>{const o=()=>{e.removeEventListener("success",a),e.removeEventListener("error",s)},a=()=>{n(J(e.result)),o()},s=()=>{r(e.error),o()};e.addEventListener("success",a),e.addEventListener("error",s)});return t.then(n=>{n instanceof IDBCursor&&Xo.set(n,e)}).catch(()=>{}),hn.set(t,e),t}function cu(e){if(Ot.has(e))return;const t=new Promise((n,r)=>{const o=()=>{e.removeEventListener("complete",a),e.removeEventListener("error",s),e.removeEventListener("abort",s)},a=()=>{n(),o()},s=()=>{r(e.error||new DOMException("AbortError","AbortError")),o()};e.addEventListener("complete",a),e.addEventListener("error",s),e.addEventListener("abort",s)});Ot.set(e,t)}let Pt={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return Ot.get(e);if(t==="objectStoreNames")return e.objectStoreNames||Jo.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return J(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function lu(e){Pt=e(Pt)}function uu(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){const r=e.call(wt(this),t,...n);return Jo.set(r,t.sort?t.sort():[t]),J(r)}:su().includes(e)?function(...t){return e.apply(wt(this),t),J(Xo.get(this))}:function(...t){return J(e.apply(wt(this),t))}}function du(e){return typeof e=="function"?uu(e):(e instanceof IDBTransaction&&cu(e),ou(e,au())?new Proxy(e,Pt):e)}function J(e){if(e instanceof IDBRequest)return iu(e);if(vt.has(e))return vt.get(e);const t=du(e);return t!==e&&(vt.set(e,t),hn.set(t,e)),t}const wt=e=>hn.get(e);function it(e,t,{blocked:n,upgrade:r,blocking:o,terminated:a}={}){const s=indexedDB.open(e,t),c=J(s);return r&&s.addEventListener("upgradeneeded",l=>{r(J(s.result),l.oldVersion,l.newVersion,J(s.transaction),l)}),n&&s.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),c.then(l=>{a&&l.addEventListener("close",()=>a()),o&&l.addEventListener("versionchange",f=>o(f.oldVersion,f.newVersion,f))}).catch(()=>{}),c}function yt(e,{blocked:t}={}){const n=indexedDB.deleteDatabase(e);return t&&n.addEventListener("blocked",r=>t(r.oldVersion,r)),J(n).then(()=>{})}const fu=["get","getKey","getAll","getAllKeys","count"],pu=["put","add","delete","clear"],xt=new Map;function Ln(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(xt.get(t))return xt.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,o=pu.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(o||fu.includes(n)))return;const a=async function(s,...c){const l=this.transaction(s,o?"readwrite":"readonly");let f=l.store;return r&&(f=f.index(c.shift())),(await Promise.all([f[n](...c),o&&l.done]))[0]};return xt.set(t,a),a}lu(e=>({...e,get:(t,n,r)=>Ln(t,n)||e.get(t,n,r),has:(t,n)=>!!Ln(t,n)||e.has(t,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hu{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(gu(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function gu(e){const t=e.getComponent();return(t==null?void 0:t.type)==="VERSION"}const $t="@firebase/app",Bn="0.11.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Q=new ru("@firebase/app"),mu="@firebase/app-compat",bu="@firebase/analytics-compat",vu="@firebase/analytics",wu="@firebase/app-check-compat",yu="@firebase/app-check",xu="@firebase/auth",_u="@firebase/auth-compat",Cu="@firebase/database",Eu="@firebase/data-connect",Iu="@firebase/database-compat",Su="@firebase/functions",Au="@firebase/functions-compat",Tu="@firebase/installations",Du="@firebase/installations-compat",ju="@firebase/messaging",Mu="@firebase/messaging-compat",Nu="@firebase/performance",Ru="@firebase/performance-compat",ku="@firebase/remote-config",Ou="@firebase/remote-config-compat",Pu="@firebase/storage",$u="@firebase/storage-compat",Fu="@firebase/firestore",Lu="@firebase/vertexai",Bu="@firebase/firestore-compat",Hu="firebase";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qe="[DEFAULT]",Uu={[$t]:"fire-core",[mu]:"fire-core-compat",[vu]:"fire-analytics",[bu]:"fire-analytics-compat",[yu]:"fire-app-check",[wu]:"fire-app-check-compat",[xu]:"fire-auth",[_u]:"fire-auth-compat",[Cu]:"fire-rtdb",[Eu]:"fire-data-connect",[Iu]:"fire-rtdb-compat",[Su]:"fire-fn",[Au]:"fire-fn-compat",[Tu]:"fire-iid",[Du]:"fire-iid-compat",[ju]:"fire-fcm",[Mu]:"fire-fcm-compat",[Nu]:"fire-perf",[Ru]:"fire-perf-compat",[ku]:"fire-rc",[Ou]:"fire-rc-compat",[Pu]:"fire-gcs",[$u]:"fire-gcs-compat",[Fu]:"fire-fst",[Bu]:"fire-fst-compat",[Lu]:"fire-vertex","fire-js":"fire-js",[Hu]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Re=new Map,Zo=new Map,Ye=new Map;function Ft(e,t){try{e.container.addComponent(t)}catch(n){Q.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function se(e){const t=e.name;if(Ye.has(t))return Q.debug(`There were multiple attempts to register component ${t}.`),!1;Ye.set(t,e);for(const n of Re.values())Ft(n,e);for(const n of Zo.values())Ft(n,e);return!0}function ct(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ku={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},oe=new st("app","Firebase",Ku);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gu{constructor(t,n,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new ae("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw oe.create("app-deleted",{appName:this._name})}}function gn(e,t={}){let n=e;typeof t!="object"&&(t={name:t});const r=Object.assign({name:qe,automaticDataCollectionEnabled:!1},t),o=r.name;if(typeof o!="string"||!o)throw oe.create("bad-app-name",{appName:String(o)});if(n||(n=Wo()),!n)throw oe.create("no-options");const a=Re.get(o);if(a){if(kt(n,a.options)&&kt(r,a.config))return a;throw oe.create("duplicate-app",{appName:o})}const s=new Zl(o);for(const l of Ye.values())s.addComponent(l);const c=new Gu(n,r,s);return Re.set(o,c),c}function Qo(e=qe){const t=Re.get(e);if(!t&&e===qe&&Wo())return gn();if(!t)throw oe.create("no-app",{appName:e});return t}function Z(e,t,n){var r;let o=(r=Uu[e])!==null&&r!==void 0?r:e;n&&(o+=`-${n}`);const a=o.match(/\s|\//),s=t.match(/\s|\//);if(a||s){const c=[`Unable to register library "${o}" with version "${t}":`];a&&c.push(`library name "${o}" contains illegal characters (whitespace or "/")`),a&&s&&c.push("and"),s&&c.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Q.warn(c.join(" "));return}se(new ae(`${o}-version`,()=>({library:o,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vu="firebase-heartbeat-database",zu=1,ke="firebase-heartbeat-store";let _t=null;function ea(){return _t||(_t=it(Vu,zu,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(ke)}catch(n){console.warn(n)}}}}).catch(e=>{throw oe.create("idb-open",{originalErrorMessage:e.message})})),_t}async function Wu(e){try{const n=(await ea()).transaction(ke),r=await n.objectStore(ke).get(ta(e));return await n.done,r}catch(t){if(t instanceof we)Q.warn(t.message);else{const n=oe.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Q.warn(n.message)}}}async function Hn(e,t){try{const r=(await ea()).transaction(ke,"readwrite");await r.objectStore(ke).put(t,ta(e)),await r.done}catch(n){if(n instanceof we)Q.warn(n.message);else{const r=oe.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Q.warn(r.message)}}}function ta(e){return`${e.name}!${e.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qu=1024,Yu=30;class Xu{constructor(t){this.container=t,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Zu(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,n;try{const o=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),a=Un();if(((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(s=>s.date===a))return;if(this._heartbeatsCache.heartbeats.push({date:a,agent:o}),this._heartbeatsCache.heartbeats.length>Yu){const s=Qu(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Q.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Un(),{heartbeatsToSend:r,unsentEntries:o}=Ju(this._heartbeatsCache.heartbeats),a=zo(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,o.length>0?(this._heartbeatsCache.heartbeats=o,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(n){return Q.warn(n),""}}}function Un(){return new Date().toISOString().substring(0,10)}function Ju(e,t=qu){const n=[];let r=e.slice();for(const o of e){const a=n.find(s=>s.agent===o.agent);if(a){if(a.dates.push(o.date),Kn(n)>t){a.dates.pop();break}}else if(n.push({agent:o.agent,dates:[o.date]}),Kn(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Zu{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return qo()?Yo().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Wu(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var n;if(await this._canUseIndexedDBPromise){const o=await this.read();return Hn(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:o.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var n;if(await this._canUseIndexedDBPromise){const o=await this.read();return Hn(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:o.lastSentHeartbeatDate,heartbeats:[...o.heartbeats,...t.heartbeats]})}else return}}function Kn(e){return zo(JSON.stringify({version:2,heartbeats:e})).length}function Qu(e){if(e.length===0)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ed(e){se(new ae("platform-logger",t=>new hu(t),"PRIVATE")),se(new ae("heartbeat",t=>new Xu(t),"PRIVATE")),Z($t,Bn,e),Z($t,Bn,"esm2017"),Z("fire-js","")}ed("");var td="firebase",nd="11.6.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Z(td,nd,"app");const Xf=Object.freeze(Object.defineProperty({__proto__:null,FirebaseError:we,_DEFAULT_ENTRY_NAME:qe,_addComponent:Ft,_apps:Re,_components:Ye,_getProvider:ct,_registerComponent:se,_serverApps:Zo,getApp:Qo,initializeApp:gn,registerVersion:Z},Symbol.toStringTag,{value:"Module"})),na="@firebase/installations",mn="0.6.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ra=1e4,oa=`w:${mn}`,aa="FIS_v2",rd="https://firebaseinstallations.googleapis.com/v1",od=60*60*1e3,ad="installations",sd="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const id={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},he=new st(ad,sd,id);function sa(e){return e instanceof we&&e.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ia({projectId:e}){return`${rd}/projects/${e}/installations`}function ca(e){return{token:e.token,requestStatus:2,expiresIn:ld(e.expiresIn),creationTime:Date.now()}}async function la(e,t){const r=(await t.json()).error;return he.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function ua({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function cd(e,{refreshToken:t}){const n=ua(e);return n.append("Authorization",ud(t)),n}async function da(e){const t=await e();return t.status>=500&&t.status<600?e():t}function ld(e){return Number(e.replace("s","000"))}function ud(e){return`${aa} ${e}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dd({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const r=ia(e),o=ua(e),a=t.getImmediate({optional:!0});if(a){const f=await a.getHeartbeatsHeader();f&&o.append("x-firebase-client",f)}const s={fid:n,authVersion:aa,appId:e.appId,sdkVersion:oa},c={method:"POST",headers:o,body:JSON.stringify(s)},l=await da(()=>fetch(r,c));if(l.ok){const f=await l.json();return{fid:f.fid||n,registrationStatus:2,refreshToken:f.refreshToken,authToken:ca(f.authToken)}}else throw await la("Create Installation",l)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fa(e){return new Promise(t=>{setTimeout(t,e)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fd(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pd=/^[cdef][\w-]{21}$/,Lt="";function hd(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const n=gd(e);return pd.test(n)?n:Lt}catch{return Lt}}function gd(e){return fd(e).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lt(e){return`${e.appName}!${e.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pa=new Map;function ha(e,t){const n=lt(e);ga(n,t),md(n,t)}function ga(e,t){const n=pa.get(e);if(n)for(const r of n)r(t)}function md(e,t){const n=bd();n&&n.postMessage({key:e,fid:t}),vd()}let de=null;function bd(){return!de&&"BroadcastChannel"in self&&(de=new BroadcastChannel("[Firebase] FID Change"),de.onmessage=e=>{ga(e.data.key,e.data.fid)}),de}function vd(){pa.size===0&&de&&(de.close(),de=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wd="firebase-installations-database",yd=1,ge="firebase-installations-store";let Ct=null;function bn(){return Ct||(Ct=it(wd,yd,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(ge)}}})),Ct}async function Xe(e,t){const n=lt(e),o=(await bn()).transaction(ge,"readwrite"),a=o.objectStore(ge),s=await a.get(n);return await a.put(t,n),await o.done,(!s||s.fid!==t.fid)&&ha(e,t.fid),t}async function ma(e){const t=lt(e),r=(await bn()).transaction(ge,"readwrite");await r.objectStore(ge).delete(t),await r.done}async function ut(e,t){const n=lt(e),o=(await bn()).transaction(ge,"readwrite"),a=o.objectStore(ge),s=await a.get(n),c=t(s);return c===void 0?await a.delete(n):await a.put(c,n),await o.done,c&&(!s||s.fid!==c.fid)&&ha(e,c.fid),c}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vn(e){let t;const n=await ut(e.appConfig,r=>{const o=xd(r),a=_d(e,o);return t=a.registrationPromise,a.installationEntry});return n.fid===Lt?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function xd(e){const t=e||{fid:hd(),registrationStatus:0};return ba(t)}function _d(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const o=Promise.reject(he.create("app-offline"));return{installationEntry:t,registrationPromise:o}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=Cd(e,n);return{installationEntry:n,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:Ed(e)}:{installationEntry:t}}async function Cd(e,t){try{const n=await dd(e,t);return Xe(e.appConfig,n)}catch(n){throw sa(n)&&n.customData.serverCode===409?await ma(e.appConfig):await Xe(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function Ed(e){let t=await Gn(e.appConfig);for(;t.registrationStatus===1;)await fa(100),t=await Gn(e.appConfig);if(t.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await vn(e);return r||n}return t}function Gn(e){return ut(e,t=>{if(!t)throw he.create("installation-not-found");return ba(t)})}function ba(e){return Id(e)?{fid:e.fid,registrationStatus:0}:e}function Id(e){return e.registrationStatus===1&&e.registrationTime+ra<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sd({appConfig:e,heartbeatServiceProvider:t},n){const r=Ad(e,n),o=cd(e,n),a=t.getImmediate({optional:!0});if(a){const f=await a.getHeartbeatsHeader();f&&o.append("x-firebase-client",f)}const s={installation:{sdkVersion:oa,appId:e.appId}},c={method:"POST",headers:o,body:JSON.stringify(s)},l=await da(()=>fetch(r,c));if(l.ok){const f=await l.json();return ca(f)}else throw await la("Generate Auth Token",l)}function Ad(e,{fid:t}){return`${ia(e)}/${t}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wn(e,t=!1){let n;const r=await ut(e.appConfig,a=>{if(!va(a))throw he.create("not-registered");const s=a.authToken;if(!t&&jd(s))return a;if(s.requestStatus===1)return n=Td(e,t),a;{if(!navigator.onLine)throw he.create("app-offline");const c=Nd(a);return n=Dd(e,c),c}});return n?await n:r.authToken}async function Td(e,t){let n=await Vn(e.appConfig);for(;n.authToken.requestStatus===1;)await fa(100),n=await Vn(e.appConfig);const r=n.authToken;return r.requestStatus===0?wn(e,t):r}function Vn(e){return ut(e,t=>{if(!va(t))throw he.create("not-registered");const n=t.authToken;return Rd(n)?Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}):t})}async function Dd(e,t){try{const n=await Sd(e,t),r=Object.assign(Object.assign({},t),{authToken:n});return await Xe(e.appConfig,r),n}catch(n){if(sa(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await ma(e.appConfig);else{const r=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await Xe(e.appConfig,r)}throw n}}function va(e){return e!==void 0&&e.registrationStatus===2}function jd(e){return e.requestStatus===2&&!Md(e)}function Md(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+od}function Nd(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}function Rd(e){return e.requestStatus===1&&e.requestTime+ra<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kd(e){const t=e,{installationEntry:n,registrationPromise:r}=await vn(t);return r?r.catch(console.error):wn(t).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Od(e,t=!1){const n=e;return await Pd(n),(await wn(n,t)).token}async function Pd(e){const{registrationPromise:t}=await vn(e);t&&await t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $d(e){if(!e||!e.options)throw Et("App Configuration");if(!e.name)throw Et("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw Et(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function Et(e){return he.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wa="installations",Fd="installations-internal",Ld=e=>{const t=e.getProvider("app").getImmediate(),n=$d(t),r=ct(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Bd=e=>{const t=e.getProvider("app").getImmediate(),n=ct(t,wa).getImmediate();return{getId:()=>kd(n),getToken:o=>Od(n,o)}};function Hd(){se(new ae(wa,Ld,"PUBLIC")),se(new ae(Fd,Bd,"PRIVATE"))}Hd();Z(na,mn);Z(na,mn,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ud="/firebase-messaging-sw.js",Kd="/firebase-cloud-messaging-push-scope",ya="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",Gd="https://fcmregistrations.googleapis.com/v1",xa="google.c.a.c_id",Vd="google.c.a.c_l",zd="google.c.a.ts",Wd="google.c.a.e",zn=1e4;var Wn;(function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(Wn||(Wn={}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var Oe;(function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"})(Oe||(Oe={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function qd(e){const t="=".repeat((4-e.length%4)%4),n=(e+t).replace(/\-/g,"+").replace(/_/g,"/"),r=atob(n),o=new Uint8Array(r.length);for(let a=0;a<r.length;++a)o[a]=r.charCodeAt(a);return o}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const It="fcm_token_details_db",Yd=5,qn="fcm_token_object_Store";async function Xd(e){if("databases"in indexedDB&&!(await indexedDB.databases()).map(a=>a.name).includes(It))return null;let t=null;return(await it(It,Yd,{upgrade:async(r,o,a,s)=>{var c;if(o<2||!r.objectStoreNames.contains(qn))return;const l=s.objectStore(qn),f=await l.index("fcmSenderId").get(e);if(await l.clear(),!!f){if(o===2){const d=f;if(!d.auth||!d.p256dh||!d.endpoint)return;t={token:d.fcmToken,createTime:(c=d.createTime)!==null&&c!==void 0?c:Date.now(),subscriptionOptions:{auth:d.auth,p256dh:d.p256dh,endpoint:d.endpoint,swScope:d.swScope,vapidKey:typeof d.vapidKey=="string"?d.vapidKey:X(d.vapidKey)}}}else if(o===3){const d=f;t={token:d.fcmToken,createTime:d.createTime,subscriptionOptions:{auth:X(d.auth),p256dh:X(d.p256dh),endpoint:d.endpoint,swScope:d.swScope,vapidKey:X(d.vapidKey)}}}else if(o===4){const d=f;t={token:d.fcmToken,createTime:d.createTime,subscriptionOptions:{auth:X(d.auth),p256dh:X(d.p256dh),endpoint:d.endpoint,swScope:d.swScope,vapidKey:X(d.vapidKey)}}}}}})).close(),await yt(It),await yt("fcm_vapid_details_db"),await yt("undefined"),Jd(t)?t:null}function Jd(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return typeof e.createTime=="number"&&e.createTime>0&&typeof e.token=="string"&&e.token.length>0&&typeof t.auth=="string"&&t.auth.length>0&&typeof t.p256dh=="string"&&t.p256dh.length>0&&typeof t.endpoint=="string"&&t.endpoint.length>0&&typeof t.swScope=="string"&&t.swScope.length>0&&typeof t.vapidKey=="string"&&t.vapidKey.length>0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zd="firebase-messaging-database",Qd=1,Pe="firebase-messaging-store";let St=null;function _a(){return St||(St=it(Zd,Qd,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(Pe)}}})),St}async function ef(e){const t=Ca(e),r=await(await _a()).transaction(Pe).objectStore(Pe).get(t);if(r)return r;{const o=await Xd(e.appConfig.senderId);if(o)return await yn(e,o),o}}async function yn(e,t){const n=Ca(e),o=(await _a()).transaction(Pe,"readwrite");return await o.objectStore(Pe).put(t,n),await o.done,t}function Ca({appConfig:e}){return e.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tf={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},N=new st("messaging","Messaging",tf);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nf(e,t){const n=await _n(e),r=Ea(t),o={method:"POST",headers:n,body:JSON.stringify(r)};let a;try{a=await(await fetch(xn(e.appConfig),o)).json()}catch(s){throw N.create("token-subscribe-failed",{errorInfo:s==null?void 0:s.toString()})}if(a.error){const s=a.error.message;throw N.create("token-subscribe-failed",{errorInfo:s})}if(!a.token)throw N.create("token-subscribe-no-token");return a.token}async function rf(e,t){const n=await _n(e),r=Ea(t.subscriptionOptions),o={method:"PATCH",headers:n,body:JSON.stringify(r)};let a;try{a=await(await fetch(`${xn(e.appConfig)}/${t.token}`,o)).json()}catch(s){throw N.create("token-update-failed",{errorInfo:s==null?void 0:s.toString()})}if(a.error){const s=a.error.message;throw N.create("token-update-failed",{errorInfo:s})}if(!a.token)throw N.create("token-update-no-token");return a.token}async function of(e,t){const r={method:"DELETE",headers:await _n(e)};try{const a=await(await fetch(`${xn(e.appConfig)}/${t}`,r)).json();if(a.error){const s=a.error.message;throw N.create("token-unsubscribe-failed",{errorInfo:s})}}catch(o){throw N.create("token-unsubscribe-failed",{errorInfo:o==null?void 0:o.toString()})}}function xn({projectId:e}){return`${Gd}/projects/${e}/registrations`}async function _n({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function Ea({p256dh:e,auth:t,endpoint:n,vapidKey:r}){const o={web:{endpoint:n,auth:t,p256dh:e}};return r!==ya&&(o.web.applicationPubKey=r),o}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const af=7*24*60*60*1e3;async function sf(e){const t=await lf(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:X(t.getKey("auth")),p256dh:X(t.getKey("p256dh"))},r=await ef(e.firebaseDependencies);if(r){if(uf(r.subscriptionOptions,n))return Date.now()>=r.createTime+af?cf(e,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await of(e.firebaseDependencies,r.token)}catch(o){console.warn(o)}return Yn(e.firebaseDependencies,n)}else return Yn(e.firebaseDependencies,n)}async function cf(e,t){try{const n=await rf(e.firebaseDependencies,t),r=Object.assign(Object.assign({},t),{token:n,createTime:Date.now()});return await yn(e.firebaseDependencies,r),n}catch(n){throw n}}async function Yn(e,t){const r={token:await nf(e,t),createTime:Date.now(),subscriptionOptions:t};return await yn(e,r),r.token}async function lf(e,t){const n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:qd(t)})}function uf(e,t){const n=t.vapidKey===e.vapidKey,r=t.endpoint===e.endpoint,o=t.auth===e.auth,a=t.p256dh===e.p256dh;return n&&r&&o&&a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xn(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return df(t,e),ff(t,e),pf(t,e),t}function df(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const r=t.notification.body;r&&(e.notification.body=r);const o=t.notification.image;o&&(e.notification.image=o);const a=t.notification.icon;a&&(e.notification.icon=a)}function ff(e,t){t.data&&(e.data=t.data)}function pf(e,t){var n,r,o,a,s;if(!t.fcmOptions&&!(!((n=t.notification)===null||n===void 0)&&n.click_action))return;e.fcmOptions={};const c=(o=(r=t.fcmOptions)===null||r===void 0?void 0:r.link)!==null&&o!==void 0?o:(a=t.notification)===null||a===void 0?void 0:a.click_action;c&&(e.fcmOptions.link=c);const l=(s=t.fcmOptions)===null||s===void 0?void 0:s.analytics_label;l&&(e.fcmOptions.analyticsLabel=l)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hf(e){return typeof e=="object"&&!!e&&xa in e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gf(e){if(!e||!e.options)throw At("App Configuration Object");if(!e.name)throw At("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const r of t)if(!n[r])throw At(r);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function At(e){return N.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mf{constructor(t,n,r){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const o=gf(t);this.firebaseDependencies={app:t,appConfig:o,installations:n,analyticsProvider:r}}_delete(){return Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bf(e){try{e.swRegistration=await navigator.serviceWorker.register(Ud,{scope:Kd}),e.swRegistration.update().catch(()=>{}),await vf(e.swRegistration)}catch(t){throw N.create("failed-service-worker-registration",{browserErrorMessage:t==null?void 0:t.message})}}async function vf(e){return new Promise((t,n)=>{const r=setTimeout(()=>n(new Error(`Service worker not registered after ${zn} ms`)),zn),o=e.installing||e.waiting;e.active?(clearTimeout(r),t()):o?o.onstatechange=a=>{var s;((s=a.target)===null||s===void 0?void 0:s.state)==="activated"&&(o.onstatechange=null,clearTimeout(r),t())}:(clearTimeout(r),n(new Error("No incoming service worker found.")))})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wf(e,t){if(!t&&!e.swRegistration&&await bf(e),!(!t&&e.swRegistration)){if(!(t instanceof ServiceWorkerRegistration))throw N.create("invalid-sw-registration");e.swRegistration=t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yf(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=ya)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ia(e,t){if(!navigator)throw N.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw N.create("permission-blocked");return await yf(e,t==null?void 0:t.vapidKey),await wf(e,t==null?void 0:t.serviceWorkerRegistration),sf(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xf(e,t,n){const r=_f(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:n[xa],message_name:n[Vd],message_time:n[zd],message_device_time:Math.floor(Date.now()/1e3)})}function _f(e){switch(e){case Oe.NOTIFICATION_CLICKED:return"notification_open";case Oe.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cf(e,t){const n=t.data;if(!n.isFirebaseMessaging)return;e.onMessageHandler&&n.messageType===Oe.PUSH_RECEIVED&&(typeof e.onMessageHandler=="function"?e.onMessageHandler(Xn(n)):e.onMessageHandler.next(Xn(n)));const r=n.data;hf(r)&&r[Wd]==="1"&&await xf(e,n.messageType,r)}const Jn="@firebase/messaging",Zn="0.12.17";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ef=e=>{const t=new mf(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>Cf(t,n)),t},If=e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:r=>Ia(t,r)}};function Sf(){se(new ae("messaging",Ef,"PUBLIC")),se(new ae("messaging-internal",If,"PRIVATE")),Z(Jn,Zn),Z(Jn,Zn,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Af(){try{await Yo()}catch{return!1}return typeof window<"u"&&qo()&&Vl()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tf(e,t){if(!navigator)throw N.create("only-available-in-window");return e.onMessageHandler=t,()=>{e.onMessageHandler=null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Df(e=Qo()){return Af().then(t=>{if(!t)throw N.create("unsupported-browser")},t=>{throw N.create("indexed-db-unsupported")}),ct(pn(e),"messaging").getImmediate()}async function Jf(e,t){return e=pn(e),Ia(e,t)}function jf(e,t){return e=pn(e),Tf(e,t)}Sf();const Zf=({children:e,breadcrumbs:t,...n})=>{const r=fe(),o=r.props.flash,a=r.props.firebase,[s,c]=u.useState(null),l=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,f=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone,d=!l||l&&f;return u.useEffect(()=>{if(!(!(a!=null&&a.apiKey)||!(a!=null&&a.projectId))&&d)try{const p=gn(a),g=Df(p);c(g)}catch(p){console.error("Firebase başlatma hatası:",p)}},[a,d]),u.useEffect(()=>{if(!s||!d)return;const p=jf(s,g=>{var v,b;const h=((v=g.notification)==null?void 0:v.title)||"Yeni Bildirim",m=((b=g.notification)==null?void 0:b.body)||"",y=g.data||{};Ae(h,{description:m,action:{label:"Görüntüle",onClick:()=>{y.url?window.location.href=y.url:window.location.href="/notifications"}},duration:8e3,position:"top-right"})});return()=>{p()}},[s]),u.useEffect(()=>{o!=null&&o.success&&Ae.success(o.success),o!=null&&o.error&&Ae.error(o.error),o!=null&&o.warning&&Ae.warning(o.warning),o!=null&&o.info&&Ae.info(o.info)},[o]),i.jsx(pl,{children:i.jsx(Rl,{breadcrumbs:t,...n,children:e})})};export{Zf as A,Ss as B,an as C,Ja as D,Df as E,Jf as F,Af as G,jf as H,Fs as I,Xf as J,Tn as M,qa as O,ls as P,Vf as R,Tt as S,za as T,Lf as W,bs as X,cn as a,Va as b,Ya as c,Za as d,Xa as e,Wa as f,vs as g,Bf as h,xs as i,_s as j,Cs as k,Es as l,Ff as m,Dr as n,$s as o,Dn as p,An as q,Gf as r,zf as s,Wf as t,hl as u,bo as v,vo as w,wo as x,Kf as y,ts as z};
