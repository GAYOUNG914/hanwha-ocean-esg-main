export function onCopyPop(copyBtn,copyBox){
    //onCopyPop(복사하기 버튼,복사 안내 팝업)

    //초기화
     copyBox.classList.remove('active');
     
     onLinkCopy(copyBtn);
     showCopyBox(copyBox);
     hideCopyBox(copyBox);
 
 }

//링크 복사
function onLinkCopy(elem){
    if (!elem.dataset.copy) return;
    let copyContents = elem.dataset.copy;

    navigator.clipboard
      .writeText(copyContents)
      .then(() => {
      })
      .catch((e) => {
        console.log(e);
      });
}
//팝업 나타나기
let copyBoxTimeout, currentBox;

function showCopyBox(box){
     // 현재 떠 있는 토스트 팝업 내리기
    if (copyBoxTimeout && currentBox) {
        currentBox.classList.remove('active');
        clearTimeout(copyBoxTimeout);
        currentBox = null;
    }

    if(!box.classList.contains('active')){
        box.classList.add('active');
        currentBox = box;
    }

    copyBoxTimeout = setTimeout(() => {
        box.classList.remove('active');
        currentBox = null;
    }, 3000);

}
//팝업 숨기기
function hideCopyBox(box){
    let xBtn = box.querySelector('.icon');
    xBtn.addEventListener('click',()=>{
        box.classList.remove('active');
    })

}

