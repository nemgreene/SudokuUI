(this["webpackJsonpsudoku-deploy7"]=this["webpackJsonpsudoku-deploy7"]||[]).push([[0],{14:function(t,e,n){"use strict";n.r(e),n.d(e,"springDuration",(function(){return o})),n.d(e,"mediumDuration",(function(){return i})),n.d(e,"snappyDuration",(function(){return u})),n.d(e,"stampStart",(function(){return s})),n.d(e,"stampFinish",(function(){return l})),n.d(e,"stripItFloat",(function(){return p})),n.d(e,"stripItStamp",(function(){return f})),n.d(e,"highStart",(function(){return A})),n.d(e,"highFinish",(function(){return d})),n.d(e,"exposeStart",(function(){return x})),n.d(e,"exposeFinish",(function(){return b})),n.d(e,"pointerStart",(function(){return m})),n.d(e,"pointerAnim",(function(){return g})),n.d(e,"borderAnimStart",(function(){return k})),n.d(e,"borderAnimEnd",(function(){return h}));var r,a=n(24),c=n(9).projection,o=300,i=500,u=50,s={config:{duration:o},from:{opacity:1,color:"aqua",transform:"translate3d(0px,0px,0px)",border:"1px aqua solid",backgroundColor:"#282c3400"}},l={loop:function(){return{color:"aqua",transform:"translate3d(0px,0px,0px)",border:"1px aqua solid"}},to:{color:"hotpink",transform:"translate3d(".concat(c(110).x,"px, ").concat(c(110).y,"px, 0)"),border:"1px hotpink solid"}},p={config:{duration:u},loop:function(){return{transform:"translate3d(0px,0px,0px)"}},to:{transform:"translate3d(".concat(c(-10).x,"px, ").concat(c(-10).y,"px, 0)")}},f={config:{duration:o},loop:function(){return{backgroundColor:"#FF69B477",transform:"translate3d(0px,0px,0px)"}},to:(r={color:"red"},Object(a.a)(r,"color","hotpink"),Object(a.a)(r,"transform","translate3d(".concat(c(110).x,"px, ").concat(c(110).y,"px, 0)")),r)},A={config:{duration:o},from:{opacity:1,color:"aqua",transform:"translate3d(0px,0px,0px)",border:"1px aqua solid"}},d={loop:function(){return{color:"aqua",transform:"translate3d(0px,0px,0px)",border:"1px aqua solid"}},to:{color:"hotpink",transform:"translate3d(".concat(c(-40).x,"px, ").concat(c(-40).y,"px, 0)"),border:"1px hotpink solid"}},x={to:{transform:"skew(0deg) scaleY(1) translate(0px, 0px)",opacity:1}},b=function(t){return{to:{transform:"skew(-30deg) scaleY(0.7) translate(".concat(t.x,"px, ").concat(t.y,"px)"),opacity:1}}},m=function(){return{from:{transform:"translate(0vh, 0vh) "}}},g=function(t){return{transform:"translate(0%, ".concat(t,"%)")}},k={opacity:0,transform:"translate3d(0px,0px,0px) scale(1, 1) "},h=function(t){return{loop:function(){return{opacity:0,transform:"translate3d(0px,0px,0px) scale(1, 1) "}},onRest:function(){t(!1)},opacity:1,transform:"translate3d(".concat(c(-240).x,"px,").concat(c(-240).y,"px,0px) scale(1.2, 1.2) ")}}},31:function(t,e,n){"use strict";n.r(e),n.d(e,"solveIt",(function(){return m})),n.d(e,"solveItSkinny",(function(){return g}));var r=n(2),a=n.n(r),c=n(8),o=n(3),i=n(5),u=n(9),s=u.alph,l=u.untether,p=u.wait,f=n(14),A=f.mediumDuration,d=f.springDuration,x=n(36).possibilities,b=n(14).highFinish,m=function(){var t=Object(i.a)(a.a.mark((function t(e,n,r){var u,f,m,g,k,h,O,v,S,I,C,j,w=arguments;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(j=function(){return(j=Object(i.a)(a.a.mark((function t(e){var n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=[],0!==e){t.next=3;break}return t.abrupt("return",!1);case 3:if(s.map(function(){var t=Object(i.a)(a.a.mark((function t(e){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!1!==v[e].includes(" ")){t.next=3;break}return n.push(1),t.abrupt("return");case 3:v[e].map(function(){var t=Object(i.a)(a.a.mark((function t(n,r){var c;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(" "!==n){t.next=6;break}if(1!==(c=x(e,r,v)).length){t.next=6;break}return S.push(r+9*s.indexOf(e)),v[e][r]=c[0],t.abrupt("return");case 6:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}());case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),r){t.next=15;break}return t.next=7,p(d,"Found all cells with only one possibility",u);case 7:return f(l(v)),h((function(t){return Object(o.a)(Object(o.a)({},t),{},{a:{x:S,y:0,trans:b,section:"parallel"}})})),t.next=11,p(d,"Found all cells with only one possibility",u);case 11:return h((function(t){return Object(o.a)(Object(o.a)({},t),{},{a:{x:S,y:0,section:"parallel"}})})),t.next=14,p(d,"Found all cells with only one possibility",u);case 14:m(l(v));case 15:if(9!==n.length){t.next=28;break}if(r){t.next=24;break}return h((function(t){return Object(o.a)(Object(o.a)({},t),{},{b:{x:S,y:0,section:"board"}})})),t.next=20,p(d,"Board completed",u);case 20:return g(l(v)),t.next=23,p(A,"Board completed",u);case 23:O(!0);case 24:return f(l(v)),t.abrupt("return",!0);case 28:if(S=[],r){t.next=32;break}return t.next=32,p(2*A,"Current confiiguration checked, recursing",u);case 32:return t.abrupt("return",C(e-1));case 33:case"end":return t.stop()}}),t)})))).apply(this,arguments)},C=function(t){return j.apply(this,arguments)},u=w.length>3&&void 0!==w[3]?w[3]:function(){},f=w.length>4&&void 0!==w[4]?w[4]:function(){},m=w.length>5&&void 0!==w[5]?w[5]:function(){},g=w.length>6&&void 0!==w[6]?w[6]:function(){},k=w.length>7&&void 0!==w[7]?w[7]:function(){},h=w.length>8&&void 0!==w[8]?w[8]:function(){},O=w.length>9&&void 0!==w[9]?w[9]:function(){},v=Object(o.a)({},l(n)),S=[],81!==(I=s.map((function(t,e){return v[t].map((function(t,e){return" "!==t?e:" "})).filter((function(t){return" "!==t})).map((function(t,n){return t+9*e}))})).reduce((function(t,e){return t?[].concat(Object(c.a)(t),Object(c.a)(e)):[]}))).length){t.next=19;break}return t.next=15,p(A,"Checking...",u);case 15:return t.next=17,p(A,"Board is complete",u);case 17:if(r){t.next=19;break}return t.abrupt("return");case 19:if(O(!1),r){t.next=32;break}return k(!0),t.next=24,p(A,"Initializing",u);case 24:return t.next=26,p(A,"Initializing",u);case 26:return h((function(t){return Object(o.a)(Object(o.a)({},t),{},{a:{x:I,y:0,section:"parallel"}})})),t.next=29,p(A,"Initializing",u);case 29:return m(v),t.next=32,p(A,"Beginning recursion",u);case 32:return t.abrupt("return",C(e));case 33:case"end":return t.stop()}}),t)})));return function(e,n,r){return t.apply(this,arguments)}}(),g=function(){var t=Object(i.a)(a.a.mark((function t(e,n){var r,c,u,p;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return p=function(){return(p=Object(i.a)(a.a.mark((function t(e){var n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=[],0!==e){t.next=3;break}return t.abrupt("return",!1);case 3:if(s.map(function(){var t=Object(i.a)(a.a.mark((function t(e){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r[e].map(function(){var t=Object(i.a)(a.a.mark((function t(n,o){var i;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(" "!==n){t.next=6;break}if(1!==(i=x(e,o,r)).length){t.next=6;break}return c.push(o+9*s.indexOf(e)),r[e][o]=i[0],t.abrupt("return");case 6:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()),!1!==r[e].includes(" ")){t.next=4;break}return n.push(1),t.abrupt("return");case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),9!==n.length){t.next=8;break}return t.abrupt("return",!0);case 8:return c=[],t.abrupt("return",u(e-1));case 10:case"end":return t.stop()}}),t)})))).apply(this,arguments)},u=function(t){return p.apply(this,arguments)},r=Object(o.a)({},l(n)),c=[],t.abrupt("return",u(e));case 5:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()},36:function(t,e,n){"use strict";n.r(e),n.d(e,"possibilities",(function(){return c}));var r="123456789".split(""),a="ABCDEFGHI".split("");function c(t,e,n){var c=0,o=r.map((function(e){return!1===n[t].includes(e)?e:void 0})).filter((function(t){return void 0!==t})),i=a.map((function(t){return-1!==r.indexOf(n[t][e])?n[t][e]:void 0})).filter((function(t){return void 0!==t}));i=r.filter((function(t){return-1===i.indexOf(t)?t:null}));var u=[],s=[0,0];for(s[0]="ABC".split("").includes(t)?"A":"DEF".split("").includes(t)?"D":"G",s[1]=e<3?0:e>=3&&e<6?3:6;c<3;){for(var l=a[a.indexOf(s[0])+c],p=0;p<3;p++)u.push(n[l][p+s[1]]);c++}return u=r.filter((function(t){return!u.includes(t)})),r.filter((function(t){return o.includes(t)&&i.includes(t)&&u.includes(t)}))}},41:function(t,e){t.exports="data:image/png;base64,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"},42:function(t,e){t.exports="data:image/png;base64,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"},43:function(t,e,n){t.exports=n(51)},50:function(t,e,n){},51:function(t,e,n){"use strict";n.r(e);var r=n(1),a=n.n(r),c=n(28),o=n.n(c),i=(n(48),n(3)),u=n(2),s=n.n(u),l=n(5),p=n(4),f=n(9),A=n(9),d=A.alph,x=A.dict,b=A.untether,m=A.wait,g=A.emptyBoard,k=A.board,h=n(14),O=h.springDuration,v=h.mediumDuration,S=n(36).possibilities;function I(){return(I=Object(l.a)(s.a.mark((function t(e){var n,r,a,c,o,u,p,f,A,h,I,C,j,w,E,y=arguments;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(E=function(){return(E=Object(l.a)(s.a.mark((function t(e){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(I++,k[e]=[" "," "," "," "," "," "," "," "," "],n(b(k)),h){t.next=6;break}return t.next=6,m(O,"Blind alley, backing up",o);case 6:C(e,0);case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)},w=function(t){return E.apply(this,arguments)},j=function(){return(j=Object(l.a)(s.a.mark((function t(e,l){var A,x,j;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(10!==I){t.next=20;break}if(I=0,h){t.next=5;break}return t.next=5,m(1e3,"Looks like trouble, lets back up",o);case 5:if(A=d.indexOf(e),I=0,"A"!==e&&"B"!==e){t.next=13;break}k=b(g),h||(n(b(g)),u(0)),C("A",0),t.next=18;break;case 13:return k[d[A]]=[" "," "," "," "," "," "," "," "," "],k[d[A-1]]=[" "," "," "," "," "," "," "," "," "],h||(u((function(t){return t-100})),n(b(k))),C(d[A-1],0),t.abrupt("return");case 18:t.next=24;break;case 20:if(!(I<10)){t.next=24;break}if(h){t.next=24;break}return t.next=24,m(0,"Generating random numbers",o);case 24:if("I"!==e||9!==l){t.next=40;break}if(h){t.next=38;break}return p((function(t){return Object(i.a)(Object(i.a)({},t),{},{a:{x:l,y:d.indexOf(e),section:"row"}})})),u(0),t.next=30,m(O,"Board Completed",o);case 30:return r(b(k)),p((function(t){return Object(i.a)(Object(i.a)({},t),{},{b:{x:l,y:d.indexOf(e),section:"section"}})})),t.next=34,m(O,"Board Completed",o);case 34:return a(b(k)),t.next=37,m(v,"Board Completed",o);case 37:f(!0);case 38:return c(!1),t.abrupt("return");case 40:if(!(l>=9)){t.next=56;break}if(h||(p((function(t){return Object(i.a)(Object(i.a)({},t),{},{a:{x:l,y:d.indexOf(e),section:"row"}})})),u((function(t){return t+100}))),I=0,h){t.next=54;break}return t.next=46,m(O,"Next line",o);case 46:if("C"!==e&&"F"!==e||p((function(t){return Object(i.a)(Object(i.a)({},t),{},{b:{x:l,y:d.indexOf(e),section:"section"}})})),r(b(k)),"C"!==e&&"F"!==e){t.next=52;break}return t.next=51,m(O,"Next line",o);case 51:a(b(k));case 52:return t.next=54,m(O,"Next line",o);case 54:l=0,e=d[d.indexOf(e)+1];case 56:if(x=S(e,l,k),j=Math.floor(Math.random()*Math.floor(x.length)),0!==x.length){t.next=62;break}return(l=0)&&(k[l][e]=" ",w(e-1)),w(e),t.abrupt("return");case 62:k[e][l]=x[j],n(Object(i.a)({},k)),C(e,l+1);case 65:case"end":return t.stop()}}),t)})))).apply(this,arguments)},C=function(t,e){return j.apply(this,arguments)},n=y.length>1&&void 0!==y[1]?y[1]:function(){},r=y.length>2&&void 0!==y[2]?y[2]:function(){},a=y.length>3&&void 0!==y[3]?y[3]:function(){},c=y.length>4?y[4]:void 0,o=y.length>5?y[5]:void 0,u=y.length>6?y[6]:void 0,p=y.length>7?y[7]:void 0,f=y.length>8?y[8]:void 0,A=y.length>9?y[9]:void 0,h=y.length>10?y[10]:void 0,I=0,f(!1),c(!0),!e){t.next=19;break}return t.abrupt("return");case 19:if(n(b(g)),h||(A(!0),n(b(g)),r(b(g)),a(b(g)),u(0)),d.map((function(t){return x.map((function(e){return k[t][e-1]=" "}))})),h){t.next=25;break}return t.next=25,m(500,"Reset board",o);case 25:return C("A",0),t.abrupt("return");case 27:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var C=n(31),j=n(9),w=j.alph,E=j.dict,y=j.untether,J=j.wait,B=j.emptyBoard,N=n(14),R=N.springDuration,T=N.mediumDuration,Q=N.snappyDuration,V=N.stripItFloat,F=N.stripItStamp,G=n(31).solveItSkinny,D=function(){var t=Object(l.a)(s.a.mark((function t(e,n){var r,a,c,o,u,p,f,A,d,x,b,m=arguments;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=m.length>2&&void 0!==m[2]?m[2]:function(){},a=m.length>3&&void 0!==m[3]?m[3]:function(){},c=m.length>4&&void 0!==m[4]?m[4]:function(){},o=m.length>5&&void 0!==m[5]?m[5]:function(){},u=m.length>6&&void 0!==m[6]?m[6]:function(){},p=m.length>7&&void 0!==m[7]?m[7]:function(){},f=m.length>8&&void 0!==m[8]?m[8]:function(){},A=m.length>9&&void 0!==m[9]?m[9]:function(){},d=!(m.length>10&&void 0!==m[10])||m[10],x=m.length>11&&void 0!==m[11]?m[11]:void 0,b=function(){var t=Object(l.a)(s.a.mark((function t(e,n,l){var A,x,m;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(0!==e){t.next=3;break}return console.log("unsolveable, completed"),t.abrupt("return");case 3:if(l||(l=[],w.forEach((function(t){E.forEach((function(e){" "!==n[t][e]&&l.push([t,e-1])}))}))),A=l[Math.floor(Math.random()*l.length)]){t.next=18;break}if(d){t.next=14;break}return f((function(t){return Object(i.a)(Object(i.a)({},t),{},{b:{x:0,y:0,section:"board"}})})),t.next=10,J(R,"Board Completed",r);case 10:return u(!0),t.next=13,J(T,"Board Completed",r);case 13:f((function(t){return Object(i.a)(Object(i.a)({},t),{},{a:{x:0,y:0,section:"board",trans:{backgroundColor:"#282c3466",color:"aqua"}}})}));case 14:return p(!1),c(y(B)),o(y(B)),t.abrupt("return");case 18:return(x=y(n))[A[0]][A[1]]=" ",t.next=22,G(20,x,!0);case 22:if(m=t.sent,l=l.filter((function(t){return JSON.stringify(t)!==JSON.stringify(A)})),d||!A){t.next=28;break}return f((function(t){return Object(i.a)(Object(i.a)({},t),{},{a:{x:w.indexOf(A[0]),y:A[1],trans:Object(i.a)({},V)}})})),t.next=28,J(Q,"Checking Cells...",r);case 28:if(!m){t.next=33;break}a(x),b(e-1,x,l),t.next=39;break;case 33:if(d||!A){t.next=38;break}return f((function(t){return Object(i.a)(Object(i.a)({},t),{},{a:{x:w.indexOf(A[0]),y:A[1],trans:Object(i.a)({},F)}})})),t.next=37,J(R,"Checking Cells...",r);case 37:c((function(t){var e=y(Object(i.a)({},t));return e[A[0]][A[1]]=n[A[0]][A[1]],e}));case 38:b(e-1,n,l);case 39:case"end":return t.stop()}}),t)})));return function(e,n,r){return t.apply(this,arguments)}}(),c(y(B)),o(y(B)),u(!1),p(!0),t.next=17,J(T,"Beginning removal",r);case 17:return d||A(!0),b(e,n,x),t.abrupt("return");case 20:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),U=n(17),K=n(8),Y=n(14),P=n(39),L=n(33),q=n(20);var H=a.a.memo((function(t){var e=t.board,n=t.coords,c=t.narration,o=t.pointerIndex,u=t.isBase,s=t.completed,l=t.cExpand,A=(t.expand,t.cCompleted,Object(r.useRef)(!1)),d=Object(U.useSpring)(Object(Y.pointerAnim)(o)),x=Object(U.useSpring)(s?Object(Y.borderAnimEnd)(l):Y.borderAnimStart),b=Object(U.useSprings)(81,(function(t){return Y.stampStart})),m=Object(p.a)(b,2),g=m[0],k=m[1],h=Array(9).fill("").map((function(t,e){return g.slice(9*e,9*(e+1))}));return Object(r.useEffect)((function(){A.current?function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;switch(r){case"parallel":k.start((function(e){return t.includes(e)?n:null}));break;case"board":k.start((function(t){return n}));break;case"row":k.start((function(t){return t>=9*e&&t<9*e+9?n:null}));break;case"block":var a=Object(f.extractPod)(t,e);k.start((function(t){return a.includes(t)?n:null}));break;case"section":var c=[].concat(Object(K.a)(Object(f.extractPod)(t-8,e)),Object(K.a)(Object(f.extractPod)(t-4,e)),Object(K.a)(Object(f.extractPod)(t,e)));k.start((function(t){return c.includes(t)?n:null}));break;default:k.start((function(r){return r===9*t+e?n:null}))}}(n.x,n.y,n.trans?n.trans:Y.stampFinish,n.section):A.current=!0}),[n,k]),a.a.createElement("div",null,a.a.createElement(P.a,{className:"hudContainer"},a.a.createElement("div",{className:"crossContainer"},a.a.createElement("div",{className:"hLines"}),a.a.createElement("div",{className:"vLines"})),u?a.a.createElement(U.animated.div,{style:Object(i.a)({},x),className:"waveContainer"}):null,c?a.a.createElement("div",{className:"narrationContainer"},a.a.createElement(U.animated.div,{style:d,className:"narrationCol"},"".concat(c))):null,a.a.createElement(L.a,{className:"headerRow flex-nowrap"},a.a.createElement(q.a,{className:"borderCell"}),f.dict.map((function(t){return a.a.createElement(q.a,{className:"borderCell nthCell",style:{color:"aqua"},key:t-1},t-1)})),a.a.createElement(q.a,{className:"borderCell"})),h.map((function(t,n){return a.a.createElement(L.a,{className:"ContainerRow flex-nowrap nthRow",key:n},a.a.createElement(q.a,{className:"borderCell"},n),t.map((function(t,r){return a.a.createElement(U.animated.div,{className:"col nthCell",key:r,style:t},a.a.createElement(q.a,{className:"animCell "},e[f.alph[n]][r]))})),a.a.createElement(q.a,{className:"borderCell"}))}))))})),Z=n(26),X=n(41),z=n.n(X),M=n(42),W=n.n(M),$=(n(50),function(){var t=Object(r.useState)(!1),e=Object(p.a)(t,2),n=e[0],c=e[1],o=Object(r.useState)(!0),u=Object(p.a)(o,2),A=u[0],d=u[1],x=Object(r.useState)(!1),b=Object(p.a)(x,2),m=b[0],g=b[1],k=Object(r.useState)(!1),h=Object(p.a)(k,2),O=h[0],v=h[1],S=Object(r.useState)(f.emptyBoard),j=Object(p.a)(S,2),w=j[0],E=j[1],y=Object(r.useState)(f.emptyBoard),J=Object(p.a)(y,2),B=J[0],N=J[1],R=Object(r.useState)(f.filled),T=Object(p.a)(R,2),Q=T[0],V=T[1],F=Object(r.useState)(""),G=Object(p.a)(F,2),K=G[0],P=G[1],L=Object(r.useState)(0),q=Object(p.a)(L,2),X=q[0],M=q[1],$=Object(r.useState)({c:{x:0,y:0},b:{x:0,y:0},a:{x:0,y:0}}),_=Object(p.a)($,2),tt=_[0],et=_[1],nt=Object(r.useState)([!0,!1,!0]),rt=Object(p.a)(nt,2),at=rt[0],ct=rt[1],ot=[Object(f.projection)(110),Object(f.projection)(0),Object(f.projection)(-110)],it=Object(U.useSprings)(3,(function(t){return{transform:"skew(0deg) scaleY(1) translate(0px, 0px)"}})),ut=Object(p.a)(it,2),st=ut[0],lt=ut[1],pt=function(){ct([!0,!1,!0]),v(!1),function(t){I.apply(this,arguments)}(m,V,N,E,g,P,M,et,v,c,A)},ft=function(){var t=Object(l.a)(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return g(!0),ct([!0,!1,!0]),v(!1),t.next=5,Object(C.solveIt)(50,Q,A,P,V,N,E,c,et,v);case 5:g(!1);case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),At=function(){var t=Object(l.a)(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:g(!0),ct([!0,!0,!1]),v(!1),D(200,Q,P,V,N,E,v,g,et,c,A);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(r.useEffect)((function(){lt.start((function(t){return n?Object(i.a)({},Object(Y.exposeFinish)(ot[t])):Object(i.a)({},Y.exposeStart)}))}),[n,lt,ot]),a.a.createElement("div",{className:"App-body"},a.a.createElement("div",{className:"hudContainer"},st.map((function(t,e){return a.a.createElement(U.animated.div,{className:"springboard".concat(e," hudOffset"),key:e,style:Object(i.a)({opacity:.4*e+.3},t)},a.a.createElement(H,{board:[w,B,Q][e],coords:tt[Object.keys(tt)[e]],narration:2===e?K:null,pointerIndex:X,isBase:0===e,completed:O,cExpand:c,expand:n,cCompleted:v}))}))),a.a.createElement("div",{className:"buttonContainer"},a.a.createElement(Z.a,{disabled:!at[0]||m,className:"controlButtons btn-dark btn-outline-info",onClick:function(){pt()}},"Generate"),a.a.createElement(Z.a,{disabled:!at[1]||m,className:"controlButtons btn-dark  btn-outline-info",onClick:function(){ft()}},"Solve It"),a.a.createElement(Z.a,{disabled:!at[2]||m,className:"controlButtons btn-dark btn-outline-info",onClick:function(){return At()}},"Strip It"),a.a.createElement(Z.a,{className:"controlButtons btn-dark btn-outline-info",onClick:function(){return d((function(t){return!t}))},disabled:m},a.a.createElement("img",{className:"eyeButton",src:A?W.a:z.a}))))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement($,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},9:function(t,e,n){"use strict";n.r(e),n.d(e,"skip",(function(){return a})),n.d(e,"dict",(function(){return c})),n.d(e,"alph",(function(){return o})),n.d(e,"unsolved",(function(){return i})),n.d(e,"filled",(function(){return u})),n.d(e,"board",(function(){return s})),n.d(e,"emptyBoard",(function(){return l})),n.d(e,"projection",(function(){return p})),n.d(e,"extractPod",(function(){return f})),n.d(e,"untether",(function(){return A})),n.d(e,"wait",(function(){return d}));var r=n(8),a=!0,c="123456789".split(""),o="ABCDEFGHI".split(""),i={A:[" ","4"," "," ","2"," ","8","6","5"],B:["7"," "," ","6"," ","8"," "," "," "],C:["1"," "," "," "," ","4","7"," ","2"],D:[" ","1","8","7","4"," "," "," "," "],E:[" "," ","5","2"," ","9","6"," "," "],F:[" "," "," "," ","8","6","1","5"," "],G:["9"," ","1","5"," "," "," "," ","6"],H:[" "," "," ","8"," ","2"," "," ","7"],I:["8","7","3"," ","6"," "," ","2"," "]},u={A:"675921384".split(""),B:"134578926".split(""),C:"982634715".split(""),D:"419265837".split(""),E:"763189452".split(""),F:"528347691".split(""),G:"256793148".split(""),H:"897412563".split(""),I:"341856279".split("")},s={A:["1","2","3","4","5","6","7","8","9"],B:["1","2","3","4","5","6","7","8","9"],C:["1","2","3","4","5","6","7","8","9"],D:["1","2","3","4","5","6","7","8","9"],E:["1","2","3","4","5","6","7","8","9"],F:["1","2","3","4","5","6","7","8","9"],G:["1","2","3","4","5","6","7","8","9"],H:["1","2","3","4","5","6","7","8","9"],I:["1","2","3","4","5","6","7","8","9"]},l={A:[" "," "," "," "," "," "," "," "," "],B:[" "," "," "," "," "," "," "," "," "],C:[" "," "," "," "," "," "," "," "," "],D:[" "," "," "," "," "," "," "," "," "],E:[" "," "," "," "," "," "," "," "," "],F:[" "," "," "," "," "," "," "," "," "],G:[" "," "," "," "," "," "," "," "," "],H:[" "," "," "," "," "," "," "," "," "],I:[" "," "," "," "," "," "," "," "," "]},p=function(t){return{x:.57749*t,y:1.53664*t}},f=function(t,e){var n=e<3?[0,26]:e<6?[27,53]:[54,90],a=Array(81).fill("").map((function(t,e){return e})).filter((function(t){return t>=n[0]&&t<=n[1]})),c=[a.slice(0,9),a.slice(9,18),a.slice(18,27)],o=t<3?[0,3]:t<6?[3,6]:[6,9],i=c.map((function(t){return t.slice(o[0],o[1])}));return[].concat(Object(r.a)(i[0]),Object(r.a)(i[1]),Object(r.a)(i[2]))};function A(t){return JSON.parse(JSON.stringify(t))}function d(t,e,n){return new Promise((function(r){setTimeout(r,t),n(e)}))}}},[[43,1,2]]]);
//# sourceMappingURL=main.0822aa32.chunk.js.map