import { useState } from 'react';
import icon from './baguette.svg';
import { Navi } from './components/Nav.js';
import { Home } from './views/Home.js'
import { Upload } from './views/Upload';
import { Check } from './views/Check.js'

function App() {
  const list_menu = [{"title": "Home", "href": "#"}, {"title": "계산하기", "href": "#"}, {"title": "이전기록", "href": "#"}]
  const home_title = "복잡한 계산은 그만!";
  const home_contents = "C.B를 이용해서 복잡한 회로도 계산을 클릭 한번으로 끝내보세요!";

  var [contents, setContents] = useState("home");
  console.log(contents);

  return (
    <div class="flex flex-col h-screen">
        <Navi list_menu={list_menu} icon={icon}></Navi>
        {contents === "home" && <Home title={home_title} contents={home_contents} setContents={setContents}></Home>}
        {contents === "upload" && <Upload setContents={setContents}></Upload>}
        {contents === "check" && <Check></Check>}
    </div>
  );
}

export default App;
