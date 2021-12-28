import { Button, Input } from "antd";
import { useState, useRef, useEffect } from "react";
import htmlParser from "html-parse-stringify";
import "../styles.css";

const { TextArea } = Input;

export default function InputMessage(props) {
  const NICKNAME_KEYWORD = '#客户昵称#',
  NICKNAME_IMG_SRC = 'https://wwcdn.weixin.qq.com/node/wework/images/201911232334.c37d3f0874.svg'
  const { setState, textVal } = props;
  const ref = useRef({});

  useEffect(() => {
    document.addEventListener('paste', e => onPaste(e))
  }, [])

  const getContent = (data) => {
    var ast = htmlParser.parse(data);

    let val = "";
    ast.forEach((item) => {
      if (item.type === "text") {
        val = val + item.content + "";
      } else {
        val = val + item.attrs.alt;
      }
    });
    return val;
  };

  const onInput = (e) => {
    const temp = getContent(e.target.innerHTML);

    setState(temp);
  };
  const onChange = (e) => {
    console.log("ref", ref.current);
    ref.current.focus();
    insertHtmlFragment(
      `<img className="nickName" src="${NICKNAME_IMG_SRC}" alt="${NICKNAME_KEYWORD}"/>`
    );
  };
  const onClick = () => {
    ref.current.blur();
    // 如果只有focus会出现只消失before，但不展示光标
    ref.current.focus();
  };
  // https://wwcdn.weixin.qq.com/node/wework/images/201911232334.c37d3f0874.svg
  const insertHtmlFragment = (html) => {
    let sel, range;
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      // 找到鼠标选中区域，拿到第一个位置
      range = sel.getRangeAt(0);
      console.log("range", range);
      // 删除选中区域内容
      range.deleteContents();

      const val = getContent(ref.current.innerHTML);

      // 创建一个新标签来装img
      let el = document.createElement("div");
      el.innerHTML = html;
      let frag = document.createDocumentFragment(),
        node,
        lastNode;
      setState(val + el.firstChild.alt);

      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);

      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  };

  const onPaste = (e) => {
    e.preventDefault();
    let text = (e.originalEvent || e).clipboardData.getData("text/plain");
    // 用户粘贴什么，不做任何转换，直接输出，包括\n\r<br/>
    // 关键词转化下
    if (text.indexOf(NICKNAME_KEYWORD) > -1) {
      var array = text.split(NICKNAME_KEYWORD);
      document.execCommand(
        "insertHtml",
        false,
        array.join(
          '<img src="' + NICKNAME_IMG_SRC + '" alt="' + NICKNAME_KEYWORD + '">'
        )
      );
    } else {
      document.execCommand("insertText", false, text);
    }
  }
  return (
    // "{客户昵称}欢迎成为我的客户，接下来由我向您提供服务"
    <div className="inputMessage">
      <div
        contentEditable="true"
        ref={ref}
        onInput={onInput}
        onClick={onClick}
        className="textarea"
        maxLength="300"
        placeholder='欢迎成为我的客户，接下来由我向您提供服务'
      >
      </div>
      <input
        type="button"
        value="插入客户昵称"
        className=""
        onClick={onChange}
      />
    </div>
  );
}
