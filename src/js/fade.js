

export function fadeIn(target){
  let level = 0;
  let inTimer = null;
  inTimer = setInterval(function(){
    level = fadeInAction(target,level,inTimer)
  },50)
}
function fadeInAction(target,level,inTimer){
  level = level + 0.1;
  changeOpacity(target, level);
  if(level>1) clearInterval(inTimer)
  return level;
}
export function fadeOut(target){
  let level = 1;
  let outTimer = null;
  outTimer = setInterval(function(){
    level = fadeOutAction(target,level,outTimer)
  },10)
}
function fadeOutAction(target,level,outTimer){
  level = level - 0.1;
  changeOpacity(target, level);
  if(level<0) clearInterval(outTimer)
  return level;
}

function changeOpacity(target,level){
  const obj = target;
  target.style.opacity = level;
  target.style.MozOpacity = level;
  target.style.KhtmlOpacity = level;
  target.style.MsFilter = "'progid: DXImageTransform.Microsoft.Alpha(Opacity="+(level * 100)+")'";
  target.style.filter = "alpha(opacity="+(level * 100)+")";
}

