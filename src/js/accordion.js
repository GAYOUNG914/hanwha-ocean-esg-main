import { toggleClass } from './toggleClass.js';
import { lenis } from "./smooth";
import * as state from './state';

export class accordion {
  constructor(arg) {
    this.$accordionElem = arg.accordionElem;
    this.$allControlWrap = this.$accordionElem.querySelector(".all-control");
    this.$allToggleBtn = this.$accordionElem.querySelector(".all-toggle-btn");
    this.isOpenFirst = arg.isOpenFirst ? arg.isOpenFirst : false; // 첫번째 요소 열기
    this.$toggleHead = this.$accordionElem.querySelectorAll(".head"); // 헤더를 누르면 열리도록

    this._setupEventListeners();
  }

  // 세팅
  _setAccordion = function () {
    for (const [idx, head] of this.$toggleHead.entries()) {
      
      const wrapElem = head.nextElementSibling;

      // 모든 버튼에 이벤트 부여
      head.addEventListener('click', () => {
        toggleClass(head, 'open');
        wrapElem.style.maxHeight ? this._close(wrapElem) : this._open(wrapElem);
        this._checkAllOpen();

      })

      // 첫번째 요소 열기
      if (idx === 0 && this.isOpenFirst) {
        toggleClass(head, 'open');
        this._open(wrapElem);
      }
    }


    // 전체 여닫기 제어
    if (this.$allControlWrap) {

      this.$allControlWrap.addEventListener('click', () => {

        if (this.$allToggleBtn.classList.contains("active")) {
          // 닫기
          for (const head of this.$toggleHead) {
            head.classList.remove('open');

            const wrapElem = head.nextElementSibling;
            this._close(wrapElem);
          }

          this.$allToggleBtn.classList.remove("active");
        } else {
          // 열기
          for (const head of this.$toggleHead) {
            head.classList.add('open');

            const wrapElem = head.nextElementSibling;
            this._open(wrapElem);
          }

          this.$allToggleBtn.classList.add("active");
        }

      })
    }
  }

  _open = function (elem) {
    lenis.stop()
    elem.style.maxHeight = elem.scrollHeight + "px";
    setTimeout(() => { lenis.resize(); lenis.start() }, 400);
  }

  _close = function (elem) {
    lenis.stop()
    elem.style.maxHeight = null;
    setTimeout(() => { lenis.resize(); lenis.start() }, 400);
  }

  // 모두 열렸는지 확인
  _checkAllOpen = function () {

    // 하나라도 open되어 있지 않은 경우, 바로 올토글버튼 off

    if(this.$allToggleBtn){
      for (const head of this.$toggleHead) {
        if (!head.classList.contains('open')) {
          this.$allToggleBtn.classList.remove('active');
          return;
        }
      }
    // 모든 요소가 open 상태일 경우, 바로 올토글버튼 on
    this.$allToggleBtn.classList.add('active');
    }

  }

  _isDesktop = function() {
    return !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }

  _setupEventListeners() {
    window.addEventListener('load', this._setAccordion.bind(this));
    
    // 리사이즈 시 강제 닫기
    window.addEventListener('resize', () => {
      // 모바일일 때는 주소창이 스크롤에 따라 나타났다가 사라지면서 리사이징 됨 -> 이거 개선해야됨
      // console.log(this._isDesktop())

      // if(this._isDesktop()){
        for (const head of this.$toggleHead) {

          if (head.classList.contains('open')) {
            // toggleClass(head, 'open');
            const wrapElem = head.nextElementSibling;
            this._open(wrapElem);
          }
  
        }

      // }


    })
  }

}

// export class accordion {
//     constructor(arg) {
//     this.$accordionElem = arg.accordionElem;
//     this.$allToggleBtn = this.$accordionElem.querySelector(".all-toggle-btn");
//     this.isOpenFirst = arg.isOpenFirst ? arg.isOpenFirst : false; // 첫번째 요소 열기
//     // console.log(this.$accordionElem.querySelectorAll(':scope > ul > li'));
//     this.$toggleList = this.$accordionElem.querySelectorAll(':scope > ul > li'); // li
//     // this.$toggleList = this.$accordionElem.querySelectorAll("li"); // li
//     this.$toggleHead = this.$accordionElem.querySelectorAll(".head"); // 헤더를 누르면 열리도록

//     this._setupEventListeners();
//   }

//     // 세팅
//   _setAccordion = function () {

//     for (const [idx, LI] of this.$toggleList.entries()) {
      
//       // 모든 버튼에 이벤트 부여
//       LI.querySelector('.head').addEventListener('click', () => {
//         LI.classList.toggle('open');
//         this._checkAllOpen();
//         setTimeout(() => { lenis.stop(); lenis.resize(); lenis.start() }, 400);
//       })
//     }

//         // 전체 여닫기 제어
//         if (this.$allToggleBtn) {

//           this.$allToggleBtn.addEventListener('click', () => {
    
//             if (this.$allToggleBtn.classList.contains("active")) {
//               // 닫기
//               for (const LI of this.$toggleList) {
//                 LI.classList.remove('open');
    
//                 // lenis.stop()
//                 // setTimeout(() => { lenis.resize(); lenis.start() }, 400);
//               }
    
//               this.$allToggleBtn.classList.remove("active");
//             } else {
//               // 열기
//               for (const LI of this.$toggleList) {
//                 LI.classList.add('open');
    
//                 // lenis.stop()
//                 // setTimeout(() => { lenis.resize(); lenis.start() }, 400);
//               }
    
//               this.$allToggleBtn.classList.add("active");
//             }
    
//             // lenis.stop()
//             setTimeout(() => { lenis.stop(); lenis.resize(); lenis.start() }, 400);
//           })
//         }
//       }
    
//       _open = function (elem) {
//         lenis.stop()
//         setTimeout(() => { lenis.resize(); lenis.start() }, 400);
//       }
    
//       _close = function (elem) {
//         lenis.stop()
//         setTimeout(() => { lenis.resize(); lenis.start() }, 400);
//       }
    
//       // 모두 열렸는지 확인
//       _checkAllOpen = function () {
    
//         // 하나라도 open되어 있지 않은 경우, 바로 올토글버튼 off
//         if(this.$allToggleBtn){
//           for (const LI of this.$toggleList) {
//             if (!LI.classList.contains('open')) {
//               this.$allToggleBtn.classList.remove('active');
//               return;
//             }
//           }
//         // 모든 요소가 open 상태일 경우, 바로 올토글버튼 on
//         this.$allToggleBtn.classList.add('active');
//         }
//     }

//   _setupEventListeners() {
//     window.addEventListener('load', this._setAccordion.bind(this));
//   }


// }