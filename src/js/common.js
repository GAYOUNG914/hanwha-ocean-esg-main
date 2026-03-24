import Pace from 'pace-js';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from "@studio-freight/lenis";
import * as state from './state';
import.meta.env
import { removeNode, isMobile, isSafari, isFirefox } from './util';
import { smooth, lenis, lenisOp } from "./smooth";
import { headerAll, footerAll } from './headerAll';
import { toggleClass } from './toggleClass';
import { subKvInteraction } from './subKv';
import { allMenuEvent } from './headerAll';
import { Tab } from './tab';
import { accordion } from './accordion.js';
import {odometerBase} from './odometer';
import { odometerInit } from './odometerInit';
import { chart } from './chart';


export let areaWidth = window.innerWidth;
export let areaHeight = window.innerHeight;

export const imagePath = '/resources/images/';

export const $html = document.documentElement;
export const $body = document.body;

const $viewportMeta = $html.querySelector('meta[name="viewport"]');
const defaultViewportContent = $viewportMeta.getAttribute('content');

// 영문으로 스크립트 분기처리 할 때 import
export const language = $html.getAttribute('lang');
export const $header = document.querySelector('#HEADER');
export const $footer = document.querySelector('#FOOTER');
export const $gnb = document.querySelector('#GNB');
export const $main = document.querySelector('body > main');
export const $subTit = document.querySelectorAll('.sub_top_tit');
export const $subDesc = document.querySelectorAll('.sub_top_desc');

export const $gnbLinks = [].slice.call($gnb.querySelectorAll('.d1>a'));
export const $gnbLinksD2 = [].slice.call($gnb.querySelectorAll('.d1>a+.depth2_box>ul>li>a'));
export const $gnbDepth1 = $gnb.querySelector('.depth1_area');
export const $gnbDepth1Ul = document.querySelector('#GNB .depth1_area .depth1_ul');
export const $gnbShop = $gnb.querySelector('.other_all_menu');
export const $btnAllMenu = $gnb.querySelector('.btn_all_menu');

export let scrollTop = 0, scrollHeight = 0, headerHeight = 0, contentHeight = 0, activeIndex = null, media = '';
export let contentId = $main.getAttribute('id');
export let contentClass = $main.getAttribute('class');
export let isCheckHdType = ($main.dataset.hdType == 'wh') ? true : false;
export const $skipMain = document.querySelector('.skipMain');

isMobile && $html.classList.add('touch-based');

$gnbLinks.forEach(($link) => {
	$link.addEventListener('click', setGnbLinkActive);
});
$skipMain.addEventListener('click', (e) => {
  e.preventDefault();
  const aTags = $main.querySelectorAll('a');
    if (aTags.length > 0) {
      if(contentId ==="MAIN") {
        window.scrollTo({top:document.querySelector('#WHATWEDO').offsetTop - window.innerHeight})
      }
      setTimeout(function(){
        aTags[0].focus();
      },100)

    } else {
      $main.setAttribute('tabindex','-1')
      $main.focus()
      return false;

    }
})
$skipMain.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const aTags = $main.querySelectorAll('a');
    console.log(aTags[0],aTags.length)
    if (aTags.length > 0) {
      if(contentId ==="MAIN") {
        window.scrollTo({top:document.querySelector('#WHATWEDO').offsetTop - window.innerHeight})
      }
      setTimeout(function(){
        aTags[0].focus();
      },100)

    } else {
      $main.setAttribute('tabindex','-1')
      $main.focus()
      return false;

    }
  }
})
// $skipMain.addEventListener('focus', (e) => {
//   $header.style.position = "absolute"
// })
// $skipMain.addEventListener('focusout', (e) => {
//   $header.style.position = "fixed"
// })

// // chloe 회의용으로 추후 삭제 예정
// const dev  = window.location.hostname;
// if(dev == import.meta.env.VITE_NSE_KEY || dev == 'localhost') {
//   document.body.classList.add('fave');
// }else {
//   document.body.classList.remove('fave');
//   document.querySelector('#debugger').remove();
//   document.querySelector('#fontGuide').remove();
// }

// ///// chloe 회의용


// history management
export const historyManager = (() => {

  smooth(lenisOp);
	const $cover = document.querySelector('.page-cover');
	if (!$cover) {
		return;
	}

	const $pageTitle = document.querySelector('title');

	let urlTo,
		_pageLoaded = false,
		_displayable = true;


	Pace.on('progress', (p) => {
    // console.log(p)
    if(p == 100){
      // console.log("%c progress 100 > body setTimeout add class 'page-in-active' 0.8s > header in motion start + sub tit in motion start","color:red;background:#ffb6c1;");
      setTimeout(() => {
        $body.classList.add('page-in-active');
        lenis.start();
        if(contentId !== 'WWA-GN-OVERSEAS' && contentId !== 'WWA-GN-SUB' && contentId !== 'WWA-IG-SHIP' && contentId !== 'WWA-IG-PLANT' && contentId !== 'WWA-IG-FACILITIES' && contentId !== 'WWA-HISTORY' && contentClass !== 'WWD-list' && contentId !== 'OV' && contentId !== 'SYS'  && contentId !== 'OSH'  && contentId !== 'SMART' && contentId !== 'CO' && contentId !== 'SG' && contentId !== 'HM' && contentId !== 'HR' && contentId !== 'RD' && contentId !== 'RT' && contentId !== 'PL' && contentId !== 'ST' && contentId !== 'CERT' && contentId !== 'CNT' && contentId !== 'BIO' && contentId !== 'CE' && contentId !== 'CEA' && contentId !== 'ENV' && contentId !== 'SO' && contentId !== 'GOV' && contentId !== 'RS' && contentId !== 'BOD'){
          lenis.scrollTo(0);
        }
      },800)
    }
  });
	Pace.options.restartOnPushState = false;
	Pace.options.restartOnRequestAfter = false;
	Pace.start();
  Pace.restart();

	// $body.addEventListener('click', function (e) {
	// 	let $target = e.target;
  //   // code modifiy chloe
  //   // if(!$target.classList.contains('btn_lang')){
     
  //   //   if($target.classList.contains('btn-subsidiary_more')){
        
  //   //     if(document.querySelector('.f_subsidiary_list').classList.contains('on')) document.querySelector('.f_subsidiary_list').classList.remove('on');
  //   //     else document.querySelector('.f_subsidiary_list').classList.add('on');
  //   //   }else{
  //   //   }
  //   // }
  //   while ($target.classList.contains('page_change')) {
  //     if ($target.nodeName.toLowerCase() === 'a') {
  //       if ($target.target !== '_blank') {
  //         changePage($target.getAttribute('href'));
  //         e.preventDefault();
  //       }
  //       break;
  //     }
  //     $target = $target.parentNode;
  //   }
  //   let m_st =  window.pageXOffset || document.documentElement.scrollTop;
  //   if($target.classList.contains('btn_all_menu')){

  //     if(!$header.classList.contains('noBgOn')){}


  //     if(!$body.classList.contains('all_menu')){
  //       $body.classList.add('all_menu');
  //       $header.classList.remove('on');
  //       $header.classList.remove('fix');
  //       if(contentId !== 'MAIN') $header.classList.remove('noBgOn');
  //       lenis.stop();
  //     }else {
  //       $body.classList.remove('all_menu');
  //       if(contentId !== 'MAIN') $header.classList.add('noBgOn');
        
  //       if(m_st>0) {
  //         $header.classList.add('fix');
  //         $header.classList.add('on');
  //       }else{
  //         $header.classList.remove('on');
  //         $header.classList.remove('fix');
  //       }
        
        
  //       lenis.start();
  //     }
  //   }    

    

	// });

	// window.addEventListener('popstate', onPoped);
	window.addEventListener('load', () => setTimeout(onPageLoadEnd, 250));
	Pace.on('done', onPageLoadEnd);


	function onPageLoadEnd (e) {
    // console.log('----- onPageLoadEnd:::');
    
    // code add & modifiy chloe
    const activeGnb = window.location.pathname;

    if(contentId == 'MAIN' || $main.dataset.pageType || isCheckHdType){
      $header.classList.remove('noBgOn');
    }else {
      $header.classList.add('noBgOn');
    }


    subPageType();

    // console.log(extractBetweenSlashes(activeGnb))

    function extractBetweenSlashes(text) {
      const parts = text.split('/');
      if (parts.length >= 3) {
          return parts[1];
      } else {
          return null;
      }
  }

  if(extractBetweenSlashes(activeGnb)){
    if (extractBetweenSlashes(activeGnb).indexOf('hse') > -1) {
      setGnbLinkActive($gnbLinks[1]);
      activeIndex = 1;
    } else if (extractBetweenSlashes(activeGnb).indexOf('sr') > -1) {
      setGnbLinkActive($gnbLinks[2]);
      activeIndex = 2;
    } else if (extractBetweenSlashes(activeGnb).indexOf('gov') > -1) {
      setGnbLinkActive($gnbLinks[3]);
      activeIndex = 3;
    } else if (extractBetweenSlashes(activeGnb).indexOf('dl') > -1) {
      setGnbLinkActive($gnbLinks[4]);
      activeIndex = 4;
    } else if (extractBetweenSlashes(activeGnb).indexOf('osa') > -1) {
      setGnbLinkActive($gnbLinks[0]);
      activeIndex = 0;
    } else {
      setGnbLinkActive();
    }
  }
    

    if (!_pageLoaded) {
      Pace.stop();
      _pageLoaded = true;
      state.dispatch('enter');
      _displayable && display();

    }
    
    subKvInteraction();
    
	}

	function display () {
    // console.log('----- display')
    // console.info("%cWe're your FAVE® you'll love. %cWe have an intense curiosity for creating immersive websites that seem alive. https://fave.kr/","font-size:12px;font-weight:bold","font-size:12px;font-weight:normal");
		state.dispatch('display');
		// state.states.media = '';
		onResize();
		unCover();
		scroller.disabled = false;
	}

	function changePage (url) {
    // console.log('----- changePage')
		urlTo = url;
		history.pushState({}, '', url);
		cover();
	}

	function onPoped (e) {
    // console.log('------ onPoped')
		urlTo = location.pathname;
		cover();
	}

	function cover () {
    // console.log('----- cover')
		$body.appendChild($cover);
		$cover.style.opacity = 0;
		gsap.fromTo($cover, 0.3, { opacity: 0 }, { opacity: 1, ease: 'quad.out', onComplete: clear });
		scroller.disabled = true;
	}

	function unCover () {
    // console.log('----- unCover')
		gsap.fromTo($cover, 0.3, { opacity: 1 }, { opacity: 0, ease: 'quad.out', onComplete: removeNode, onCompleteParams: [$cover] });
	}

	function clear () {
    // console.log('----- clear')
		setScrollTop(0);

		state.dispatch('leave');
		state.clear();

		loadPage();
    
	}

	function loadPage () {
    // console.log('----- loadPage')
		Pace.restart();
		Pace.track(function() {
			fetch(urlTo)
				.then((response) => response.text())
				.then(onLoad);
		});
	}

	function onLoad (response) {
    // console.log('----- onLoad');
		let pageTitle = response.match(/<title>(.+)<\/title>/);
		$pageTitle.innerHTML = pageTitle[1];
    
    // code add & modifiy chloe
    const content = response.match(/<main +id="([^"]+)" +class="([^"]+)">([\s\S]+)<\/main>/);

    contentId ='';
    contentId = content[1]
    $main.id = contentId;
		$main.className = content[2];
		$main.innerHTML = content[3];



		if (content[2].indexOf('osa') > -1) {
			setGnbLinkActive($gnbLinks[0]);
		} else if (content[2].indexOf('hse') > -1) {
			setGnbLinkActive($gnbLinks[1]);
		} else if (content[2].indexOf('sr') > -1) {
			setGnbLinkActive($gnbLinks[2]);
		} else if (content[2].indexOf('gov') > -1) {
			setGnbLinkActive($gnbLinks[3]);
		} else if (content[2].indexOf('dl') > -1) {
			setGnbLinkActive($gnbLinks[4]);
		} else {
			setGnbLinkActive();
		}
    

		scroller.disabled = false;

    // code add chloe
    $main.classList.remove('in');

    if(contentId == 'MAIN' || $main.dataset.pageType || isCheckHdType) {
      $header.classList.remove('noBgOn');
      setTimeout(() => {
        setSubTitBr('.sec_tit');
        setSubTitBr('.sec_desc');

        setSubTitBr('.txt_ef_up');
      },100)
      setTimeout(() => {$main.classList.add('in')},250)
    }else {
      $header.classList.add('noBgOn');
      setTimeout(() => {
        setSubTitBr('.sub_top_tit');
        setSubTitBr('.sub_top_desc');

        setSubTitBr('.txt_ef_up');
      },100)
      setTimeout(() => {$main.classList.add('in')},250)
    }

    // setSubTitBr('.txt_ef_up');

    subPageType();
	}

	return {
		set displayable (value) {
			_displayable = value;
		},
		display
	}
})();



// copy .gnb, .util from header to mobile menu
// const $mobileMenu = document.querySelector('#mobile-menu');

// // mobile menu tirgger
// const $mobileMenuButton = document.querySelector('.mobile-menu-button');
// $mobileMenuButton && $mobileMenuButton.addEventListener('click', () => {
// 	$html.classList.toggle('mobile-menu-open');
// });


 

// animate scroll
const scroller = (() => {
	const tweener = { y: 0, dy: -1, py: 0, ry: 0 };
	const isTouchMouse = [];

	let prevWheelDelta = 120,
		isWheelCaptured = false,
		_disabled = true;


	!isMobile && !isFirefox && $html.addEventListener('wheel', (e) => {
		if (_disabled) {
			e.preventDefault();
			return false;
		}
		
		// check touch mouse
		let _isTouchMouse = false;
		if (e.wheelDeltaY !== undefined) {
			if (e.wheelDeltaY === -3 * e.deltaY || (!isSafari && (prevWheelDelta % 120 !== 0 || Math.abs(e.wheelDeltaY) % 120 !== 0))) {
				_isTouchMouse = true;
			}
			prevWheelDelta = Math.abs(e.wheelDeltaY);
		} else if (e.wheelDelta !== undefined) {
			if (prevWheelDelta % 120 !== 0 || Math.abs(e.wheelDelta) % 120 !== 0) {
				_isTouchMouse = true;
			}
			prevWheelDelta = Math.abs(e.wheelDelta);
		}
		isTouchMouse.unshift(_isTouchMouse);
		isTouchMouse.length = 2;

		if (!isTouchMouse[0] && !isTouchMouse[1]) { // safari issue
			if (hasScrollBox(e.target)) {
				return;
			}
			if (0 > tweener.dy) {
				setTweenerValueManually(window.screenY);
			}
			if (tweener.ry) {
				tweener.dy = tweener.dy - tweener.ry;
				tweener.ry = 0;
			}
			const deltaY = e.deltaY !== undefined ? e.deltaY : e.wheelDeltaY !== undefined ? e.wheelDeltaY : e.detail || e.wheelDelta * -1;
			const newScrollTop = Math.round(Math.max(0, Math.min(scrollHeight - areaHeight, tweener.dy + Math.max(-500, Math.min(500, deltaY)))));

			animate(newScrollTop);
			e.preventDefault();
		}
	}, { passive: false });

	window.addEventListener('scroll', update);

	document.body.addEventListener('click', () => {
		tweener.tween && tweener.tween.kill();
		tweener.dy = tweener.py = tweener.y;
	});


	function animate (newY) {
		if (tweener.dy !== newY) {
			const duration = Math.max(0.25, Math.min(1.25, Math.abs(newY - tweener.y) / 150));
			tweener.tween && tweener.tween.kill();
			tweener.tween = gsap.to(tweener, duration, { y: newY, ease: 'quint.out', roundProps: 'y', onUpdate: onAnimate });
			tweener.dy = newY;
		}
	}

	function onAnimate () {
		if (tweener.y !== tweener.py) {
			isWheelCaptured = true;
			tweener.y = tweener.y - tweener.ry;
			window.scrollTo(0, tweener.y);
			tweener.py = tweener.y;
		}
	}

	function setTweenerValueManually (value) {
		tweener.y = tweener.dy = value;
		tweener.ry = 0;
	}

	function hasScrollBox ($node) {
		while ($node && $node !== $body) {
			if (window.getComputedStyle($node)['overflow'].indexOf('auto') > -1) {
				return true;
			}
			$node = $node.parentNode;
		}
		return false;
	}

	function update (_scrollTop) {
		const scrollTop = typeof(_scrollTop) == 'number' ? _scrollTop : window.scrollY;

		tweener.ry = Math.max(tweener.ry, tweener.y - scrollTop);

		if (!isWheelCaptured) {
			tweener.tween && tweener.tween.kill();
			setTweenerValueManually(scrollTop);
		}
		isWheelCaptured = false;

		scrollHeight = Math.max($html.scrollHeight, $body.scrollHeight);
		headerHeight = $header.offsetHeight;
		contentHeight = scrollHeight - $footer.offsetHeight;

		state.dispatch('scroll', scrollTop, scrollHeight, contentHeight);
	}

	return {
		set disabled (value) {
			_disabled = !!value;
		},
		update: update
	};

})();


window.addEventListener('resize', onResize);
requestAnimationFrame(onResize);


function setScrollTop (value) {
	window.scrollTo(0, value);
}


function onResize () {
	areaWidth = $main.offsetWidth;
	areaHeight = window.innerHeight;
  const winW = window.innerWidth;
	if (isMobile) {
		const screenWidth = window.screen.width;
		// $viewportMeta.setAttribute('content', screenWidth > 359 ? screenWidth > 767 && screenWidth < 1280 ? 'width=1280' : defaultViewportContent : 'width=360');
	}

	// media = 'desktop';

	// if ($mobileMenuButton && $mobileMenuButton.offsetWidth) {
	// 	media = $mobileMenuButton.offsetTop > 10 ? 'tablet' : 'mobile';
	// }
  if(winW<1024 && winW > 768) media = 'tablet';
  else if(winW<=768 ) media = 'mobile'; 
  else  media = 'desktop';
  // console.log('if문전::::-------',state.states.media,media,winW)

  if(media !== 'desktop' && $body.classList.contains('all_menu')) allMenuEvent();
	if (state.states.media !== media) {
		state.dispatch('mediachange', media);
	}

  // console.log('state.states.media::::',state.states.media, media)

	$html.style.setProperty('--aw', areaWidth + 'px');
	$html.style.setProperty('--ah', areaHeight + 'px');

	state.dispatch('resize', areaWidth, areaHeight);
  if(state.states.media !== 'desktop') {

    if(state.states.media !== 'mobile'){
      $header.classList.add('in-tablet');
      $header.classList.remove('in-mobile');
    }else{
      $header.classList.remove('in-tablet');
      $header.classList.add('in-mobile');
    }
    
  }else {
    $header.classList.remove('in-tablet');
    $header.classList.remove('in-mobile');
  }

	scroller.update();
}

function setGnbLinkActive (_$target) {
	const $target = _$target && _$target.nodeName ? _$target : this;
	$gnbLinks.forEach(($link, _idx) => {
		$link.classList[$link === $target ? 'add' : 'remove']('active');
		// $link.parentNode.classList[$link === $target ? 'add' : 'remove']('active');
    // $link.parentNode.dataset.height = $link.parentNode.offsetHeight+$link.nextElementSibling.offsetHeight
    // $link.parentNode.style.height = $link.parentNode.dataset.height
    // console.log($link.parentNode.dataset.height)
	});

  //depth2 code add chloe
  const activeGnbD2 = $main.querySelector('.main-inner').dataset.path;
  $gnbLinksD2.forEach((_item) => {
    _item.classList.remove('active')
    if(_item.dataset.path == activeGnbD2){
      _item.classList.add('active')
    }
  })
}

// code add chloe
window.addEventListener('load', function(){
  headerAll();
  footerAll();
  hoverRipple();

  if(contentId !== 'MAIN' || $main.dataset.pageType || isCheckHdType) {
    $header.classList.add('noBgOn');  
    setTimeout(() => {
      setSubTitBr('.sub_top_tit');
      setSubTitBr('.sub_top_desc');
  setSubTitBr('.txt_ef_up');

    },100)
    setTimeout(() => {$main.classList.add('in')},250)
  }else{
    setTimeout(() => {
      setSubTitBr('.sec_tit');
      setSubTitBr('.sec_desc');
  setSubTitBr('.txt_ef_up');

    },100)
    setTimeout(() => {$main.classList.add('in')},250)

  }

  // setSubTitBr('.txt_ef_up');

  subPageType();
  
  let subTit = document.querySelectorAll('.sub_top_tit');
  let mainTit = document.querySelectorAll('.sec_tit');
  let maindesc = document.querySelectorAll('.sec_desc');
  let txtEfUp = document.querySelectorAll('.txt_ef_up');
  if(media === 'desktop'){
    window.addEventListener('resize', function(){
      if(contentId !== 'MAIN' || $main.dataset.pageType || isCheckHdType) {
        resizeCopyBrStyle(subTit, 'mobile')
        resizeCopyBrStyle(txtEfUp, 'mobile')
      }else if(contentId === 'MAIN'){
        resizeCopyBrStyle(mainTit, 'mobile')
        resizeCopyBrStyle(maindesc, 'mobile')
      }
    })
  }else if(media === 'tablet'){

  }else{
    window.addEventListener('resize', function(){
      if(contentId !== 'MAIN' || $main.dataset.pageType || isCheckHdType) {
        resizeCopyBrStyle(subTit, 'desktop')
        resizeCopyBrStyle(txtEfUp, 'desktop')
      }else if(contentId === 'MAIN'){
        resizeCopyBrStyle(mainTit, 'desktop')
        resizeCopyBrStyle(maindesc, 'desktop')
      }
    })
  }
});

function resizeCopyBrStyle(_el, _media){
  if(_el){
    _el.forEach(element => {
      const pElements = element.querySelectorAll('p');
      const spanElements = element.querySelectorAll('span');
      if(media === _media){
        pElements.forEach(p => {
            p.style.display = 'inline';
        });
        spanElements.forEach(span => {
          span.style.display = 'inline';
        });
      }else{
        pElements.forEach(p => {
          p.style.display = '';
        });
        spanElements.forEach(span => {
          span.style.display = '';
        });
      }
    });
  }
}
export function videoLoadPlay(_vid){
  _vid.addEventListener("canplaythrough", function() {
    _vid.play();
  });
}

export function hoverRipple() {
  const btn = document.querySelectorAll("[hover='ripple']");
  

  btn.forEach(_el => {
    _el.addEventListener('mouseenter', (e) => {
      let x ,y
      if($body.classList.contains('show_pop')){
        // const pp = document.querySelector('.m_popup.show .pop_inner');
        // const pp2 = document.querySelector('.m_popup.show .pop_contents');
        // x = e.pageX - _el.offsetLeft - pp2.offsetLeft - window.scrollX
        // y = e.pageY - _el.offsetTop - pp.offsetTop - window.scrollY
        x = e.offsetX
        y = e.offsetY
      }else{
        x = e.layerX
        y = e.layerY
      }
      _el.style.setProperty('--x', x + 'px')
      _el.style.setProperty('--y', y + 'px')
    })
  })
}

// br기준으로 나누기
export function setSubTitBr(_el) {
  let newA = new Array;
  let _target = document.querySelectorAll(_el);
  let brTag='';

  _target.forEach((item, index) => {
    if ( item.classList.contains('txt_loaded') ) {
      newA.push('');
      return;
    }

    if(media === 'desktop'){
      newA.push(item.innerHTML.split(/<br\s*class=(?:"pc"|'pc'|pc)[^>]*>/));
      brTag = '<br class="pc">';
    }else if(media === 'tablet'){
      newA.push(item.innerHTML.split(/<br\s*class=(?:"tablet"|'tablet'|tablet)[^>]*>/));
      brTag = '<br class="tablet">';
    }else{
      newA.push(item.innerHTML.split(/<br\s*class=(?:"mobile"|'mobile'|mobile)[^>]*>/));
      brTag = '<br class="mobile">';
    }
    // newA.push(item.innerHTML.split(/<br[^>]*>/));
    _target[index].innerHTML = '';
    for(let i=0,len = newA[index].length;i<len;i++){
      _target[index].innerHTML += `<p><span>${newA[index][i]}</span></p>`;
    }

    for(let aa of document.querySelectorAll(_el)){
    for(let a of aa.querySelectorAll('span')){
      if(a.textContent.trim().length == 0){
        if(a.parentElement.tagName == 'P'){
          a.parentElement.remove();
        }
      }
    }
    }


  });
}

// // 모든 문자열 나누기
// function setSubTitAll(_target) {
//   _target.forEach((_target) => {
//     _target.innerHTML = '<div><span>' + _target.textContent.trim().split('').join('</span><span>') + '</span></div>'
//   });
// }

// // 사명 걸러서 나누기 => 작업중
// function setSubTitPiece(_target) {
//   let newA = new Array; // br 끊기
//   let newB = new Array; // 사명 끊기
//   _target.forEach((_target,_index) => {
//     newA = [];
//     newA.push(_target.innerHTML.trim().split('<br>'));
//     _target.innerHTML = '';
//     for(let i=0,len = newA[_index].length;i<len;i++){
//       // console.log('nse',newA[_index][i])
//       if(newA[_index][i].indexOf('m_hanwhaR') > -1){
//         newB=[];
//         newB.push(newA[_index][i].split('</em>'))
//         // console.log('ii::',i,newB)
//         _target.innerHTML += `<p><span>${newB[_index][0]}</em></span><span>${newB[_index][1].split('').join('</span><span>')}</span></p>`;
//       }
//       else {
//         _target.innerHTML += '<p><span>'+newA[_index][i].split('').join('</span><span>')+'</span></p>';
//       }
   
//     }
//   });
// }




// common layout type check
function subPageType(){
const dataset = $main.dataset;
const classes = [
  { condition: dataset.hdType, element: $header, className: 'main_ver' },
  { condition: dataset.ftHide, element: $body, className: 'hide-ft' },
  { condition: dataset.hdHide, element: $body, className: 'hide-hd' },
  { condition: dataset.ftPd, element: $footer, className: 'no-pd' },
  { condition: dataset.showroom, element: $body, className: 'showroom' },
];

classes.forEach(item => {
  if (item.condition) {
    item.element.classList.add(item.className);
  }
});
}

// device landscape mode
function landscapeMode(){
  if($main.dataset.landscape){
    const $landscape = document.createElement('div');
    const $noticeDesc = language == 'ko' ? '해당사이트는 세로 해상도에 <br>최적화되어 있습니다' : 'This website is optimized for vertical scrolling.'
    $landscape.id = 'landscape';
    
    $header.after($landscape);

    $landscape.innerHTML = `
      <span class="icon">
        <img src="/resources/images/common/landscape_01.png" alt="">
        <img src="/resources/images/common/landscape_02.png" alt="">
      </span>
      <p class="desc">${$noticeDesc}</p>
    `
  }
}
landscapeMode();

function importTab () {
  if(contentId == 'WWA-GN-OVERSEAS' || contentId == 'WWA-GN-SUB' || contentId == 'OV' || contentId == 'SYS' || contentId == 'OSH' || contentId == 'SMART' || contentId == 'CO' || contentId == 'SG' || contentId == 'HM' || contentId == 'HR' || contentId == 'RT' || contentId == 'RD' || contentId == 'PL' || contentId == 'ST' || contentId == 'CERT' || contentId == 'CNT' || contentId == 'BIO' || contentId == 'CE' || contentId == 'CEA' || contentId == 'GOV' || contentId == 'SO' || contentId == 'ENV' || contentId == 'RS' || contentId == 'BOD') {
    const tabList = document.querySelector(`#${contentId} .tab-looking-a`);
    new Tab(tabList);
  }
  
}
importTab();

function tabPos(){
  const tabList = document.querySelector('.common-tab-looking-a-wrap');
  const activeElem = tabList?.querySelector('.tab-item.active');

  if(activeElem){

    const xBtnRact = activeElem.getBoundingClientRect();
    const scrollToX = tabList.scrollLeft + xBtnRact.left - 20;//모바일 패딩
 
    setTimeout(()=>{
      tabList.scrollTo({left:scrollToX, behavior:'auto'})//auto 로 스크롤 즉시 실행
    },500)
  }
}
tabPos();


function commonNavigator () {
  const $commonNav = document.querySelector('.common-navigator');
  if($commonNav){
    const $navLinks = $commonNav.querySelectorAll('a');
    const $midMotions = document.querySelectorAll('.nav-target');
    let headerH = document.querySelector('#HEADER').getBoundingClientRect().height;
    let scrollY = window.scrollY;
    let prevSection = null;
    let lastScrollTop = 0;
    let lastVal = 0;
    let commonNavH  = $commonNav.getBoundingClientRect().height; 
    let midTop;

    const handleActiveElement = () => {
      const activeElement = $commonNav.querySelector('li a.active');
    
      if (activeElement && $commonNav) {
        const firstActiveListLeft = 50; // 왼쪽 기준점 설정
        const elementPosition = activeElement.getBoundingClientRect().left - firstActiveListLeft;
        const scrollPosition = $commonNav.scrollLeft + elementPosition;
    
        $commonNav.scroll({
          left: scrollPosition, // 가로 스크롤 위치 설정
          behavior: 'smooth'
        });
      }
    };
  
    window.addEventListener('resize',()=>{
      headerH = document.querySelector('#HEADER').getBoundingClientRect().height;
      commonNavH = $commonNav.getBoundingClientRect().height;
    })
  
    window.addEventListener('scroll',()=>{
      let subContain = document.querySelector('.sub_container');
      let subContainTop = subContain.getBoundingClientRect().top + scrollY;
      let subContainBottom = subContainTop + subContain.getBoundingClientRect().height;
      scrollY = window.scrollY;
      // commonNavH = $commonNav.getBoundingClientRect().height;
      // headerH = document.querySelector('#HEADER').getBoundingClientRect().height;
  
      if($midMotions){
        midTop = $midMotions[0].getBoundingClientRect().top + scrollY;
        //섹션에 따라 연혁 네비게이션 리스트 active
        for (let i = 0; i < $midMotions.length; i++) {
          const sectionTop = $midMotions[i].getBoundingClientRect().top + scrollY;
          const sectionBottom = sectionTop + $midMotions[i].offsetHeight;
    
          const sectionTopTEST =$midMotions[i].getBoundingClientRect().top;
          const sectionHeightTEST = $midMotions[i].getBoundingClientRect().height;
          let process = -(sectionTopTEST - window.innerHeight/5) / (sectionHeightTEST);
      
          if (0 <= process && process <= 1) {
            if (prevSection !== i) {
              for (let a of $navLinks) {
                if (a.classList.contains('active')) {
                  a.classList.remove('active');
                }
              }
      
              if (!$navLinks[i].classList.contains('active')) {
                $navLinks[i].classList.add('active');
                handleActiveElement();
              }
      
              prevSection = i;
            }
            break; // 현재 섹션을 찾았으므로 반복문 종료
          }
        }
      }
  
      //scroll에 따른 nav 상하 왔다갔다
      if ( scrollY >= subContainTop && scrollY <= subContainBottom ) {
  
        if (scrollY > lastVal) {
          // console.log('아래로 스크롤');
          $commonNav.classList.remove('up');
          $commonNav.style.top = 0;
  
        } else if (scrollY < lastVal) {
          $commonNav.classList.add('up');
            $commonNav.style.top = headerH - 1 + 'px';
        }
      }else{
        $commonNav.style.top = 0;
      }  
  
      lastScrollTop = scrollY;
      lastVal = scrollY <= 0 ? 0 : scrollY; //


    })

    let previousIndex = -1; 


    for(let navLink of $navLinks){

      navLink.addEventListener('click', function(e){
        e.preventDefault();
        let targetId = e.currentTarget.dataset.section;
        let con = document.querySelector(`#${targetId}`);
        let conTop = con.getBoundingClientRect().top + scrollY;
        let currentIndex = Array.from($commonNav.querySelectorAll('li')).indexOf(e.currentTarget.parentNode);


        if(targetId){

          if(previousIndex > currentIndex){
              lenis.scrollTo(conTop - commonNavH - headerH);
            }else if(previousIndex < currentIndex){
              lenis.scrollTo(conTop - commonNavH);
            }

            previousIndex = currentIndex;

        }

  
      });
    }

  }

}

commonNavigator();

const $commonTab = document.querySelectorAll('.common-tab-looking-a-wrap');

function commonTab(){
  if ($commonTab.length > 0 && window.innerWidth < 769) {
    for(let a of $commonTab){
      a.style.width = document.documentElement.clientWidth + 'px';
    }
  }else{
    for(let a of $commonTab){
      a.style.width = 'auto';
    }
  }
}
commonTab();
window.addEventListener('resize',commonTab);



function commonAccordion () {
  if (document.querySelector('#common-accordion')) {
    const $accordion = document.querySelector('#common-accordion');
    new accordion({ accordionElem: $accordion })
  }
}

commonAccordion();

function commonOdometer () {
    odometerBase();
    gsap.registerPlugin(ScrollTrigger);

    const odometerArea = document.querySelector('#common-odometer');
    if(odometerArea){

      const odometerItems = odometerArea.querySelectorAll(".common-odometer");

      ScrollTrigger.create({
          trigger:odometerArea,
          start:`top bottom`,
          end: `bottom top`,
          invalidateOnResize: true,
          onEnter: () => { //영역 안으로 들어올때
            odometerItems.forEach((odometer)=>{
              odometerInit(odometer,true);
            })
           },
          onLeave: () => {//영역 밖으로 벗어날때 
            odometerItems.forEach((odometer)=>{
              odometerInit(odometer,false);
            })
          },
          onEnterBack: () => {
            odometerItems.forEach((odometer)=>{
              odometerInit(odometer,true);
            })
            },
          onLeaveBack: () => {
            odometerItems.forEach((odometer)=>{
              odometerInit(odometer,false);
            })
           },
          scrub: true, 
          fastScrollEnd: true ,
       })

    }
}

commonOdometer();

function commonChart () {
    const chartArea = document.querySelector('#common-chart');
    const chartReBtn = document.querySelector('#common-chart .re-btn');


    if(chartArea){
      //스크롤 기반 chart 애니메이션
      chart(); 
      //특정 타이밍에 재실행 경우 | chart('실행될 .common-chart-wrap ",재실행 여부); 
      chartReBtn.addEventListener('click',()=>{
        let reChartElm = chartReBtn.closest('.common-chart-wrap');
        chart(reChartElm,true); 
      })
    }
}

commonChart();


//모바일시 좌우 슬라이드 아이콘 활성화 -> 클릭시 아이콘 hideen
(() => {
  const $mobScrBoxs = document.querySelectorAll('.in_mob_scr, .common-table-wrap, .infogram');
  if($mobScrBoxs.length > 0){
    /* observer 생성 */
    let callback = (entries, observer) => {
      entries.forEach((entry) => {
        const $iconSwings = entry.target.querySelector('.icon-swipe');
        if ( entry.isIntersecting ) {
          !$iconSwings.classList.contains('hide') && $iconSwings.classList.add('on');
        } else {
          $iconSwings.classList.contains('on') && $iconSwings.classList.remove('on');
        }
      });
    };
    let observer = new IntersectionObserver(callback, { rootMargin: "20px", threshold: 0.5, });

    /* mobScrollBox 이벤트 생성 */
    $mobScrBoxs.forEach($scrBox => {
      const $scrElem = $scrBox.querySelector('.picture') || $scrBox.querySelector('.common-table') || $scrBox.querySelector('.graph-img');
      let $iconSwings = $scrBox.querySelector('.icon-swipe');
      let isMedia;
      let isProgrammaticScroll = false;

      if ( !$scrElem ) return;

      // center 정렬
      let isInitCenter = $scrBox.classList.contains('scr-center');
      
      // in_mob_scr class가 없다면 추가
      !$scrBox.classList.contains('in_mob_scr') && $scrBox.classList.add('in_mob_scr');

      // icon DOM이 없다면 추가
      if ( !$iconSwings ) {
        $iconSwings = document.createElement('div');
        $iconSwings.classList.add('icon-swipe');
        if ( isInitCenter ) {
          $scrElem.style.position = 'relative';
          $scrElem.append($iconSwings);
        } else {
          $scrBox.append($iconSwings);
        }
      }

      // pointdown event
      function onPointDown (e) {

        if ( e.type === 'scroll' && isProgrammaticScroll ) {
          isProgrammaticScroll = false;
          return;
        }

        setTimeout(() => {
          $iconSwings.classList.add('hide');
        }, 1200);
        observer.unobserve($scrBox);
        setTimeout(() => {
          $iconSwings.classList.remove('on');
        }, 1600);

       // $scrBox.removeEventListener('pointerdown', onPointDown);
        $scrBox.removeEventListener('scroll', onPointDown);
      }

      // mediachange
      state.on('mediachange', (media) => {
        isMedia = media;

        if ( media === 'mobile' ) {  
          // center 정렬
          if ( isInitCenter) {
            isProgrammaticScroll = true;
            $scrBox.scrollTo({ left: ($scrElem.offsetWidth - $scrBox.offsetWidth)/2  });
          }

          // observer 부여
          observer.observe($scrBox);

          // click 시 아이콘 hidden
          //$scrBox.addEventListener('pointerdown', onPointDown);
          $scrBox.addEventListener('scroll', onPointDown);
        } else {
          // 이벤트 해제
          observer.unobserve($scrBox);
          $iconSwings.classList.remove('on');
         // $scrBox.removeEventListener('pointerdown', onPointDown);
          $scrBox.removeEventListener('scroll', onPointDown);
        }
      });
      // resize
      state.on('resize', (areaWidth, areaHeight) => {
        if ( isMedia === 'mobile' ) {
          if ( $scrElem.offsetWidth <= $scrBox.offsetWidth ) {
            // console.log($scrElem,$scrBox)
            $iconSwings.style.display = 'none';
          } else {
            $iconSwings.style.display = '';
          }
          
          if ( isInitCenter && !$iconSwings.classList.contains('hide') ) {
            // click 전이라면 resize시 센터 정렬 유지
            isProgrammaticScroll = true;
            $scrBox.scrollTo({ left: ($scrElem.offsetWidth - $scrBox.offsetWidth)/2  });
          }
        }
      })
    });
  }
})();



