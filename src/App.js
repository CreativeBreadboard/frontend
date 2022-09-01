import { useState } from 'react';
import icon from './baguette.svg';
import { Navi } from './components/Nav.js';
import { Home } from './views/Home.js'
import { Upload } from './views/Upload';
import { Check } from './views/Check.js'
import { Result } from './views/Result.js';

function App() {
  const BASE_URL = "http://pengpark.com:7080/";

  const list_menu = [{"title": "Home", "href": "#"}, {"title": "계산하기", "href": "#"}, {"title": "이전기록", "href": "#"}]
  const home_title = "복잡한 계산은 그만!";
  const home_contents = "C.B를 이용해서 복잡한 회로도 계산을 클릭 한번으로 끝내보세요!";

  var [resultData, setResultData] = useState({});
  var [contents, setContents] = useState("home");
  console.log(contents);

  return (
    <div class="flex flex-col h-screen">
        <Navi list_menu={list_menu} icon={icon}></Navi>
        {contents === "home" && 
            <Home title={home_title} contents={home_contents} setContents={setContents}/>}
        {contents === "upload" && 
            <Upload setContents={setContents} setResultData={setResultData} BASE_URL={BASE_URL}/>}
        {contents === "check" && 
            <Check setContents={setContents} setResultData={setResultData} resultData={resultData} BASE_URL={BASE_URL}/>}
        {contents === "result" && 
            <Result setContents={setContents} setResultData={setResultData} resultData={resultData} BASE_URL={BASE_URL}/>}
    </div>
  );
}

export default App;
