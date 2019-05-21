// global properties and other stuff
import * as ctrl from "./controller.js"

var s = document.getElementById('svgSpace');
var sidebar = document.getElementById('sidebar');
var playground = document.getElementById('playground');

/////////////// functions ////////////////////////

function toggleSidebar(){
  document.getElementById('toggleSidebar').classList.toggle('active');
  sidebar.classList.toggle('active');

}

function hideSidebar(){
  document.getElementById('toggleSidebar').classList.remove('active');
  sidebar.classList.remove('active');

}

function onDocumentDrag_noDrop(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "none";
}

function onDocumentDrop_noDrop(event) {
  event.preventDefault();
  return false;
}

var sharinglink = document.location.href;

function shareSNS(link, name){
  var d=document,
  e=encodeURIComponent,
  s1=window.getSelection,
  s2=d.getSelection,
  s3=d.selection,
  s=s1?s1():s2?s2():s3?s3.createRange().text:'',
  r=link+e(sharinglink)+'&title='+e(d.title),
  x=function(){
    if(!window.open(r,name,'toolbar=0,resizable=1,scrollbars=yes,status=1,width=450,height=330'))location.href=r+'&r=1'};
    if(/Firefox/.test(navigator.userAgent)){
      setTimeout(x,0)
    }else{
      x()
    }
  }

function postCtrls(){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'http://localhost:3000/saveShare', true);

  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200) {
      document.getElementById("savedLink").value = window.location.href +xhr.responseText;
      sharinglink = window.location.href +xhr.responseText;
    }
  };
  var s= JSON.stringify(ctrl.ctrls);
  // console.log(s)
  xhr.send(s);
  //{"obj": JSON.stringify(ctrl.ctrls)}

}

function copyLink() {
  var copyText = document.getElementById("savedLink");
  copyText.select();
  document.execCommand("copy");
}

///////////// Init ///////////////////////////
document.addEventListener("keydown", ctrl.onKeyPress, false);
document.getElementById('toggleSidebar').addEventListener('click', toggleSidebar, false);
s.addEventListener('click', hideSidebar, false);
document.addEventListener('dragover', onDocumentDrag_noDrop, false);
document.addEventListener('drop', onDocumentDrop_noDrop, false);

/////////////// ctrl init /////////////////
ctrl.initCtrl();
document.getElementById('addNewCtrl').addEventListener('click', ctrl.addNewCtrl, false);
document.getElementById('saveShare').addEventListener('click', postCtrls, false);
document.getElementById('shareWeibo').addEventListener('click', () => {shareSNS('http://service.weibo.com/share/share.php?url=','Weibo')}, false);
document.getElementById('shareFB').addEventListener('click', () => {shareSNS('https://www.facebook.com/sharer/sharer.php?u=', 'Facebook')}, false);
document.getElementById('shareTwitter').addEventListener('click', () => {shareSNS('https://twitter.com/share?url=', 'Twitter')}, false);
document.getElementById('copyLink').addEventListener('click', copyLink, false);

// sidebar.addEventListener('dragleave', onDocumentDrag, false);

// ctrl.changeAniBinding(97, eles.animateParticules);
