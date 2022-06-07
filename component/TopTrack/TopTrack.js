import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
}


// export const getServerSideProps =wrapper.getServerSideProps(
//     (store)=>async(dispatch)=>{
//         // console.log('dispatch',dispatch)
//         try{
//             store.dispatch(trackStart({payload:true}))
//             const response=await fetch(
//                 `http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${store.form.country.toLowerCase()}&api_key=b34b1d3084048c33ec1d45bcafbd8c1d&format=json`
//             )
//             console.log(response)
//             const data = await response.json();
//             dispatch(trackSuccess({payload: data.tracks.track.slice(0, store.form.topNumber)}));
//                 // dispatch(trackSuccess(data))
//         }
//         catch{

//             store.dispatch(trackError({ payload: `😔\u00A0\u00A0No data found for ${store.form.country.toUpperCase()} `}))
//         }
//         finally{
//             store.dispatch(trackStart({payload:false}))
//         }
//     }
// )




const TopTrack = () => {
//  const dispatch=useDispatch();

 const TopTrack=useSelector((state)=>state.topTrack.data)
 const isLoading = useSelector((state) => state?.topTrack?.isLoading);
    const error = useSelector((state) => state?.topTrack?.error);
    const value = useSelector((state) => state?.topTrack?.data);
    const country = useSelector((state) => state?.form?.country);
    const topNumber = useSelector((state) => state?.form?.topNumber);
    console.log("value data")
    console.log(typeof(country))
    
    // console.log(value.tracks.track)
// const a =()=>{
//    console.log("testing a");
//    console.log(value)
//    console.log(value.map((item)=>{
//       return item.name;
//    }))
// } 
// a();
    

//  useEffect(()=>{
//     dispatch(getTopTrack())
//  },[])
 
//     return (
//     <div>{JSON.stringify(TopTrack)}</div>
//   )
// }

const [options, setOptions] = useState({
   chart: {
       type: 'column',
   },
   title: {
       text: `Top ${topNumber} tracks in ${country.toUpperCase()}`,
   },
   accessibility: {
       announceNewData: {
           enabled: true,
       },
   },
   xAxis: {
       categories: value.map((item) => item.name),
   },
   yAxis: {
       title: {
           text: 'Total listeners',
       },
   },
   legend: {
       enabled: false,
   },
   plotOptions: {
       series: {
           borderWidth: 0,
           dataLabels: {
               enabled: true,
               format: '{point.y:.f}',
           },
       },
   },
   tooltip: {
       pointFormat:
           '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.f}</b> of total<br/>',
   },
   series: [
       {
           colorByPoint: true,
           data: value.map((item) => {
               return { name: item.name, y: Number(item.listeners) };
           }),
       },
   ],
});

useEffect(() => {
   window.Highcharts = Highcharts;
   setOptions({
       ...options,
       title: {
           text: `Top ${topNumber} tracks in ${country.toUpperCase()}`,
       },
       xAxis: {
           categories: value.map((item) => item.name),
       },
       series: [
           {
               colorByPoint: true,
               data: value.map((item) => {
                   return { name: item.name, y: Number(item.listeners) };
               }),
           },
       ],
   });
}, [value]);

return (
   <div>
       {isLoading ? (
          "hello"
         //   <Spinner />
       ) : error ? null : (
           <HighchartsReact highcharts={Highcharts} options={options} />
       )}
       {/* <div>{JSON.stringify(value)}</div> */}
   </div>
);
};

export default TopTrack;
