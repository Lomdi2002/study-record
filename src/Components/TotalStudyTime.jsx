export const TotalStudyTime = (props) => {

  const {records} = props;
    const totalTime = records.reduce((sum, record) => sum + record.time, 0);
    return <p>合計時間：{totalTime}/1000(h)</p>
};