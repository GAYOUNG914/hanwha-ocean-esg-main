import { chart } from './chart';
import Chart from 'chart.js/auto';
export const $pd = document.querySelector('.pd');

export function pd() {

  const chartPieWrap = document.querySelector('.pie-wrap');
  const tabCT = document.querySelectorAll('.gt-tablist');

  //innerTab
  function onClickTab(tablist){
    const tabBtns = tablist.querySelectorAll('.tab-button');
    const gtWrap = tablist.parentElement;
    const tabPanels = gtWrap.querySelectorAll('.tab-con');


    for(let i = 0; i < tabBtns.length; i++){
      tabBtns[i].addEventListener('click', (e) => {

        //---버튼 
        tabBtns.forEach((btns)=>{
          btns.classList.remove('active')
          btns.setAttribute('aria-selected', 'false');
        })

        e.target.classList.add('active');
        e.target.setAttribute('aria-selected', 'true');

        //---패널
        tabPanels.forEach((panel)=>{
          panel.classList.remove('active')

          //클릭한 버튼 아이디와 같은 pannel 활성화 
          let paanelId = panel.id;
          let paanelChart = panel.querySelector('.common-chart-wrap');
          if(paanelId == e.target.getAttribute('aria-controls')){
            panel.classList.add('active');

            //패널에 차트 애니메이션이 있다면 재실행
            if(paanelChart){
              chart(paanelChart,true); 
            }
          }

        })
        
      });

    }

  }

  function init(){
    //chart();//구간별 그래프 애니메이션
   // if(chartPieWrap){ drawPie()}//도넛 차트 애니메이션
    // chartLine();

    tabCT.forEach((tablist)=>{
       onClickTab(tablist)
    })
  }

  window.addEventListener('load',init())
  // window.addEventListener('resize', onEventResize);

}
export function chartLine(){
  const $lineCanvas = document.getElementById("line-chart").getContext("2d");
  let lineChart;
  const valGap = 500000;
  const lineValues = {count:valGap, min: 1000000, max:3000000};

  const lineOpt = {
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
       
        y: {
          min: 1000000,
          max: 300000,
          ticks: {
            stepSize: 500000,
            display: false 
          },
          grid: {
                display: false ,
                drawBorder: false,
            }
        }
      }
    },
    plugins: {
      legend: {
          display: false
      },
      tooltip: {
          enabled: false
      },
     
  },
  };
  const lineChartData = {
    labels: ['2021', '2022', '2023'],
    datasets: [{
        label: '연도별 수치',
        data: [2401847, 2318810, 2765135,3000000,1000000],
        borderColor: '#000',
    }]
  
};
function lineDrawChart(){
  // console.log($lineCanvas)
  lineChart = new Chart( $lineCanvas, {
          type: 'line',
          data: lineChartData,
          options: lineOpt,
  });

}
function init(){
  lineDrawChart()
}

  window.addEventListener('load',init())
}
export function drawPie() {

  const $majCanvas = document.getElementById("major-chart").getContext("2d");
  const $minCanvas = document.getElementById("minor-chart").getContext("2d");

  let minCHart = null;
  let majChart = null;
  let winWidth,winMedia;
  let majBorder;
  let majColor = $majCanvas.createLinearGradient(100, 500, 100, 0);
  majColor.addColorStop(1, '#ED7100');//start
  majColor.addColorStop(0, '#FFB067');//end

  //차트 옵션
  const pieOpt = {
    // rotation:각도
    // circumference: 둘레,
      responsive: true,//반응형 여부
      plugins: {
          legend: {
              display: false//그래프 설명 태그 표시 여부
          },
          tooltip: {
              enabled: false//마우스오버시 데이트 표시 여부 
          },
         
      },
      animation: {
          animateRotate: true,
          animateScale: false,
          easing: 'easeInOutCubic',//easeInCubic
          duration: 500,
          delay: 1000,
      },
  };
  const majChartData = {
      datasets: [
        {
          data: [42, 58],
          backgroundColor: ['transparent', majColor],
          borderRadius: 5,
          borderWidth: 2, 
        }
      ]
  };
  const minChartData = {
    datasets: [
      {
        data: [42, 0],
        backgroundColor: ['#B8B8B8', '#FF6600'],
        borderWidth: 0, 
      }
    ]
};

  //차트 애니메이션
  function drawChart(){
      chartMinor();
      chartMajor();
  }
  //차트 애니메이션 -- 메인 그래프
  function chartMajor(){
    
    if (majChart) { majChart.destroy(); }
    majChart = new Chart($majCanvas, {
          type: 'pie',
          data: majChartData,
          options: pieOpt,
    });

  }
  //차트 애니메이션 -- 기타 그래프
  function chartMinor(){
    if (minCHart) {minCHart.destroy();}
    minCHart = new Chart($minCanvas, {
      type: 'pie',
      data: minChartData,
      options: pieOpt
    });
  }

  //innerTab

  function init(){

    setTimeout(()=>{drawChart()})//원형차트
  
  }

  window.addEventListener('load',init())
  // window.addEventListener('resize', onEventResize);

}
if ($pd) pd();


