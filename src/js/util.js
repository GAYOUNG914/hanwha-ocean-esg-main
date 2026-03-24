import { gsap } from 'gsap';


const $html = document.documentElement;

const userAgent = navigator.userAgent;
export const isMobile = (/(ip(ad|hone|od)|android)/i).test(userAgent) || (navigator.platform.toLowerCase() === 'macintel' && navigator.maxTouchPoints > 1);
export const isAndroid = (/android/i).test(userAgent);
export const isEdge = (/(edge|edg)/i).test(userAgent);
export const isFirefox = (/firefox/i).test(userAgent);
export const isSafari = (/safari/i).test(userAgent) && !(/chrome/i).test(userAgent);
export const isMobileOrTablet = (navigator.maxTouchPoints>0)? true : false; 
// export const isMobileOrTablet = /Android|webOS|iPhone|iPad|iPod|(ip(ad|hone|od)|android)|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

isMobile && $html.classList.add('mobile');
isEdge && $html.classList.add('edge');
isSafari && $html.classList.add('safari');
isFirefox && $html.classList.add('firefox');
isMobileOrTablet && $html.classList.add('notWeb')


export function removeNode ($node) { 
	$node && $node.parentNode && $node.parentNode.removeChild($node);
}

export function getCountDown (scheduleTime) {
	let time  = Math.max(0, scheduleTime - new Date().getTime()) / 1000;

	let day = Math.floor(time / 86400);
	time -= day * 86400;

	let hour = Math.floor(time / 3600);
	time -= hour * 3600;

	let minute = Math.floor(time / 60);
	time -= minute * 60;

	let second = Math.floor(time);

	return [day, hour, minute, second].map(addZero);
}

export function addZero (value) { 
	return (value > 9 ? '' : '0') + value;
}









