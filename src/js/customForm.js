import { toggleClass } from './toggleClass.js';

export class customSelect {
  constructor(arg) {

    this.selectBox = arg.selectBox;
    this.selectBtn = arg.selectBtn;
    this.select = arg.select;
    this.options = arg.options;
    this.input = arg.input;

    let selectedOption = null;


    // 셀렉트 박스가 열려 있는지 확인 여부
    this.isOpenSelect = function () {
      return this.select.classList.contains('open');
    }

    // 여닫기
    this.openCloseSelect = function () {
      toggleClass(this.selectBtn, 'open') // 클래스 토글로 여닫기
      toggleClass(this.select, 'open') // 클래스 토글로 여닫기

      this.switchTabindex(); // tabindex 조정
    }

    // select 여닫기에 따른 tabindex 전환
    this.switchTabindex = function () {
      const tabIdx = this.isOpenSelect() ? 0 : -1; // 셀렉트 박스가 열려 있으면 tabindex 0, 아닐 경우 -1

      for (const option of this.options) {
        option.setAttribute('tabindex', tabIdx);
      }
    }

    // 옵션 클릭시 input[type='text']에 값 전달
    this.inputClickedOption = function (option) {
      this.input.value = option.dataset.value;
    }
    
    // 인풋 영역 클릭시 드롭다운 열기
    this.clickSelectArea = function () {
      this.selectBox.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() !== 'input') return;
        this.openCloseSelect();
      })
    }

    // 직접 입력
    this.directInput = function () {
      this.input.value = ''
      this.input.removeAttribute('readonly', 'readonly');
      this.input.focus();
    }

    // 직접 입력 잠그기
    this.setReadonly = function () {
      this.input.setAttribute('readonly', 'readonly');
    }

    // 셀렉트 초기화
    this.resetSelect = function () {
      this.input.value = '';
      selectedOption && toggleClass(selectedOption, 'on');
      selectedOption = null;
      this.isOpenSelect() && this.openCloseSelect();
    }



    // Event ✌🏻

    // 셀렉트 박스 버튼에 여닫기 이벤트 추가
    this.selectBtn.addEventListener('click', () => {
      this.openCloseSelect()
    })

    // 옵션 클릭시
    for (const option of this.options) {
      option.addEventListener('click', () => {

        selectedOption && toggleClass(selectedOption, 'on');
        toggleClass(option, 'on')
        selectedOption = option;

        // 직접입력일 경우, data-value 없음
        if (option.dataset.value) {
          this.setReadonly();
          this.inputClickedOption(option)
        } else {
          this.directInput()
        }

        this.openCloseSelect()

      });
    }

    // ESC로 셀렉트 닫기
    window.addEventListener('keydown', (e) => {
      if (e.key == 'Escape' || e.code == 'Escape') {

        if (this.isOpenSelect()) {
          this.openCloseSelect()
          this.selectBtn.focus();
          this.switchTabindex();
        }

      }
    })

  }
}

export class customNumberInput {
  constructor(arg) {

    this.input = arg.input;

    // 숫자만 입력 가능
    this.checkInputNumber = function (e) {

      if (e.key == 'Backspace' || e.key == 'Tab' || e.key == 'Enter') return;

      if (e.key.match(/[^0-9]/g)) {
        e.preventDefault();
        e.stopPropagation();
        e.target.value =  e.target.value.replace(/[^0-9]/g, '');
        e.target.focus()
      }
    }

    // Event ✌🏻
    this.input.addEventListener('keydown', (e) => {
      this.checkInputNumber(e);
    })

    this.input.addEventListener('keypress', (e) => {
      this.checkInputNumber(e);
    })
    
    this.input.addEventListener('keyup', (e) => {
      this.checkInputNumber(e);
    })

  }
}

export class customPhoneInput extends customNumberInput {
  constructor(arg) {

    super(arg);

    // 자동 하이픈 추가
    this.addHyphen = function () {
      let number = this.input.value.replace(/\D/g, '');
      if (number.length > 3 && number.length <= 7) {
        number = number.replace(/(\d{3})(\d+)/, '$1-$2');
      } else if (number.length > 7) {
        number = number.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
      }
      this.input.value = number;
    }

    // Event ✌🏻
    this.input.addEventListener('keyup', (e) => {
      this.addHyphen();
    })

  }
}

export class customInput {
  constructor(arg) {

    this.input = arg.input;
    this.delBtn = arg.delBtn;

    // 삭제 버튼 띄우기
    this.switchDelBtn = function () {
      if (this.input.value.length >= 1) {
        this.delBtn.classList.add('on');
      } else {
        this.delBtn.classList.remove('on');
      }
    }

    // 공백 제거
    this.deleteGap = function () {
      this.input.value = this.input.value.replace(/\s| /gi,''); // 공백제거
    }

    this.resetInput = function () {
      this.input.value = '';
      this.delBtn.classList.remove('on');
    }

    // Event ✌🏻
    this.input.addEventListener('keyup', () => {
      this.deleteGap();
      this.switchDelBtn();
    })

    this.delBtn.addEventListener('click', (e) => {
      this.resetInput();
    })

  }
}

export class customNotKorean {
  constructor(arg) {

    this.input = arg.input;
    const korean_pattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;

    // 한글 입력 불가능
    this.checkNotKorean = function (e) {
      if (korean_pattern.test(e.target.value)) {
        e.target.value = e.target.value.replace(korean_pattern, '');
      }
    }

    // Event ✌🏻
    this.input.addEventListener('keydown', (e) => {
      this.checkNotKorean(e);
    })

    this.input.addEventListener('keypress', (e) => {
      this.checkNotKorean(e);
    })
    
    this.input.addEventListener('keyup', (e) => {
      this.checkNotKorean(e);
    })

  }
}

export class customPassword extends customNotKorean {
  constructor(arg) {

    super(arg);
    this.checkInput = arg.checkInput;
    this.isMatchesFormat = false;
    this.isEqual = false;

    // 6~20자 사이, 특수문자 '<', '>' 제외
    const passwordRegex = /^[^\<\>]{6,20}$/;

    // 정규식 확인
    this.validatePassword = function () {
      this.isMatchesFormat = passwordRegex.test(this.input.value);
    }

    // 비밀번호 확인
    this.isEqualPassword = function () {
      this.isEqual = this.input.value == this.checkInput.value;
    }

    // 비밀번호 확인 에러 체크
    this.toggleCheckError = function () {
      this.isEqualPassword()
      if ( this.isEqual ) this.checkInput.parentElement.classList.remove('error');
        else this.checkInput.parentElement.classList.add('error');
    }

    this.input.addEventListener('keyup', () => {
      this.validatePassword()
      if ( this.isMatchesFormat ) this.input.parentElement.classList.remove('error');
        else this.input.parentElement.classList.add('error');
      this.toggleCheckError();
    })

    this.checkInput.addEventListener('keyup', () => {
      this.toggleCheckError();
    })

  }
}

export class customTextarea {
  constructor(arg) {

    this.textareaBox = arg.textareaBox;
    this.textarea = arg.textarea;
    this.countElem = arg.countElem;
    this.maxLength = arg.maxLength;

    let length;

    // 글자 수 세기
    this.countText = function () {
      length = this.textarea.value.length;
      this.inputCount()
    }

    // 글자 수 삽입
    this.inputCount = function () {
      this.countElem.innerText = length;
    }

    // 글자 수 제한
    this.limitCountText = function () {
      if (length > this.maxLength) {
        this.textareaBox.classList.add('error');
      } else {
        this.textareaBox.classList.remove('error');
      }
      this.inputCount()
    }

    // 글자 자르기
    this.curCountText = function () {
      this.textarea.value = this.textarea.value.substring(0, this.maxLength); // 최대 길이까지만 유지
      this.countText();
      this.limitCountText()
    }


    // Event ✌🏻
    this.maxLength && this.textarea.addEventListener('keydown', () => {
      this.countText();
      this.limitCountText();
    })

    this.maxLength && this.textarea.addEventListener('keypress', () => {
      this.countText();
      this.limitCountText()
    })

    this.textarea.addEventListener('keyup', () => {
      this.countText();
      this.limitCountText();
      this.curCountText();
    })

  }
}


export class customForm {
  constructor(arg) {

    this.form = arg.form;
    this.inputs = null;
    this.radios = null;
    this.domainInput = arg.domainInput;
    this.resetBtn = arg.resetBtn;
    this.submitBtn = arg.submitBtn;

    const mail_pattern = /^[a-z]+\.[a-z]{1,4}$/i;
    let isCheckedDomain = false;


    // readonly인 값 탭으로 포커스되지 않도록
    this.switchTabindex = function () {

      for (const input of this.inputs) {
        const tabIdx = input.hasAttribute('readonly') ? -1 : 0;
        input.setAttribute('tabindex', tabIdx);
      }
    }

    // 도메인 형식에 맞는지 체크
    this.checkDomain = function () {

      if (this.domainInput.getAttribute('readonly') || mail_pattern.test(this.domainInput.value)) {
        this.domainInput.parentElement.classList.remove('error');
        isCheckedDomain = true;
      } else {
        this.domainInput.parentElement.classList.add('error');
        isCheckedDomain = false;
      }
    }

    // 폼 타입에 따라 검사할 인풋 변동
    this.updateInputs = function () {
      this.inputs = arg.form.querySelectorAll('input:not([disabled]):not([type="radio"]):not([type="checkbox"]):not([type="file"]), textarea');
      this.radios = arg.form.querySelectorAll('input[type=radio]:not([disabled])');
      this.checkFill()
    }

    // 폼 기재 확인
    this.checkFill = function (important) {

      // 만약 변수로 false가 넘어온다면 무조건 비활성화
      if (important !== undefined && important == false) { 
        unactiveSubmitBtn(this.submitBtn);
        return false; }

      if (!this.domainInput.getAttribute('disabled') && !isCheckedDomain) return false;

      let isFillInputs = false;
      let isFillRadios = true;

      // 인풋 값이 하나라도 비어있으면 실패
      for (const input of this.inputs) {
        if ( input.value == '' || input.value == null) {
          isFillInputs = false;
          break
        } else {
          isFillInputs = true;
        }
      }

      // 라디오 값이 선택되었는지 확인
      const groupName = new Set();

      for (const radio of this.radios) groupName.add(radio.name);

      for (const name of groupName) {
        // 각 그룹의 선택된 라디오 버튼 찾기
        
        const selected = this.form.querySelector(`input[name="${name}"]:checked`);
        if (!selected) {
          isFillRadios = false;
          break;
        }
      }


      if (isFillInputs && isFillRadios) {
        activeSubmitBtn(this.submitBtn);
      } else {
        unactiveSubmitBtn(this.submitBtn); 
      }

      function activeSubmitBtn (btn) {
        btn.removeAttribute('disabled')
        btn.setAttribute('color', 'black');
      }
      function unactiveSubmitBtn (btn) {
        btn.setAttribute('disabled', 'disabled')
        btn.setAttribute('color', 'none');
      }
    }

    // 폼 리셋
    this.resetForm = function () {
      for (const input of this.inputs) {
        if (input.hasAttribute('disable') || input.hasAttribute('readonly')) continue;
        input.value = '';
      }

      for (const btn of this.form.querySelectorAll('.del_btn')) {
        btn.classList.remove('on');
      }
    }


    // Event ✌🏻

    this.updateInputs();
    this.switchTabindex();

    this.domainInput.addEventListener('keyup', () => {
      this.checkDomain()
    })
    
    // 키 입력을 다 마치면
    for (const input of this.inputs) {
      input.addEventListener('keyup', () => {
        this.checkFill()
        this.switchTabindex();
      });
    }

    // 리셋
    this.resetBtn.addEventListener('click', () => {
      this.resetForm()
    });


  }
}






