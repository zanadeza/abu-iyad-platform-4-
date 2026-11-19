(function(){
var d=document,root="../",SEL={},res=d.getElementById("eres"),cnt=d.getElementById("ecount"),today=new Date().toISOString().slice(0,10);
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function load(cb){if(window.SEARCH_DATA){cb();return}var s=d.createElement("script");s.src=root+"assets/search-data.js";s.onload=cb;d.head.appendChild(s)}
function href(u){return root+u+(location.protocol==="file:"&&/\/$/.test(u)?"index.html":"")}
function row(x){var M=window.SEARCH_META||{},m=M[x.k]||M.page||{t:"",i:"",c:""};
 return '<a class="card res '+m.c+'" href="'+href(x.u)+'"><h3><span class="mini">'+m.i+'</span>'+esc(x.t)+'</h3>'+(x.sm?'<p>'+esc(x.sm)+'</p>':'')+'<div class="meta"><span>'+esc(m.t)+'</span>'+(x.o&&x.k!=="orgs"?'<span>'+esc(x.o)+'</span>':'')+'</div></a>'}
function render(){
 var keys=Object.keys(SEL).filter(function(k){return SEL[k]});
 if(!keys.length){res.innerHTML='<p class="empty">اختر وضعك من الأزرار بالأعلى.</p>';cnt.textContent="";return}
 load(function(){
  var M=window.SEARCH_META||{},order=Object.keys(M);
  var list=(window.SEARCH_DATA||[]).filter(function(x){
   if(!x.f||!x.f.some(function(k){return SEL[k]}))return false;
   return !(x.st==="closed"||(x.st==="open"&&x.cd&&x.cd<today))});
  list.sort(function(a,b){return order.indexOf(a.k)-order.indexOf(b.k)});
  res.innerHTML=list.length?list.map(row).join(""):'<p class="empty">لا توجد روابط مخصصة لهذا الوضع بعد. جرّب البحث في الموقع.</p>';
  cnt.textContent=list.length+" رابط مناسب"})}
d.querySelectorAll("#sit .chip").forEach(function(b){b.addEventListener("click",function(){var k=b.dataset.s;SEL[k]=!SEL[k];b.setAttribute("aria-pressed",SEL[k]);render()})});
})();
