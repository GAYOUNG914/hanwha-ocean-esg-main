import * as state from './state';

export function layerPopup(){

  // 쿠키 설정 함수
  function setCookie(_name, _val, _days) {
    let expires = "";
    if (_days) {
      let date = new Date();
      date.setTime(date.getTime() + (_days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = _name + "=" + (_val || "") + expires + "; path=/";
  }

  // 쿠키 가져오기 함수
  function getCookie(_name) {
    var nameEQ = _name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  
  function init(){
    const islayerPop = (document.querySelector('.layer_pop')) ? true : false;
   
    if(islayerPop){
      const $layerPop = document.querySelectorAll('.layer_pop')
      const $btnClose = document.querySelectorAll('.layer_pop .btn_close_pop');
      const checkboxes = document.querySelectorAll('[id^="chkday"]');


      // 팝업 내 스크롤 영역 높이 세팅
      $layerPop.forEach(function(_el){
        _el.querySelector('.layer_body .l_body_inner').style.height = _el.offsetHeight - ((_el.querySelector('.layer_head'))?_el.querySelector('.layer_head').offsetHeight:0) - ((_el.querySelector('.layer_body .l_body_btn'))?_el.querySelector('.layer_body .l_body_btn').offsetHeight:0)- ((_el.querySelector('.layer_footer'))?_el.querySelector('.layer_footer').offsetHeight:0)+'px'
      })


      // 팝업 닫기
      $btnClose.forEach(function(btn) {
        btn.addEventListener('click', function() {
          const popup = this.closest('.layer_pop');
      
          if (popup) {
            popup.style.display = 'none';
          }
        });
      });

      // 오늘 하루 보지 않기
      checkboxes.forEach(function(checkbox) {
        const popupId = checkbox.id.replace("chkday", "popup");
        const popup = document.getElementById(popupId);
        
        if (popup) {
          let num = popup.getAttribute("data-day");
          var cookieName = "hide_popup_" + popupId + "_" +  num;

          if (num !== "0") {
            var hidePopup = getCookie(cookieName);

            if (hidePopup) {
              popup.style.display = "none";
            }

            checkbox.addEventListener("change", function() {
              if (this.checked) {
                setCookie(cookieName, "true", Number(num));
                popup.style.display = "none";
              } else {
                setCookie(cookieName, "", -1);
                popup.style.display = "block";
              }
            });
          }else{
            popup.style.display = 'block';
            checkbox.addEventListener("change", function() {
              if (this.checked) {
                setCookie(cookieName, "", -1);
                popup.style.display = "none";
              }
            });
          }
        }
      });

      // 모바일 팝업 세팅
      if (state.states.media === 'mobile') {
        for(let i = $layerPop.length ; i>0 ;i--){
          $layerPop[i-1].style.zIndex = $layerPop.length-i
        }
      }

    }else{
      document.querySelector('.layer_pop_area').remove();
    }
 
  }

  init()
}