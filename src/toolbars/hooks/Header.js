/**
 * Copyright (C) 2021 THL A29 Limited, a Tencent company.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import MenuBase from '@/toolbars/MenuBase';
/**
 * 插入1级~5级标题
 */
export default class Header extends MenuBase {
  constructor(editor) {
    super(editor);
    this.setName('header', 'header');
    this.subMenuConfig = [
      { iconName: 'h1', name: 'h1', onclick: this.bindSubClick.bind(this, '1') },
      { iconName: 'h2', name: 'h2', onclick: this.bindSubClick.bind(this, '2') },
      { iconName: 'h3', name: 'h3', onclick: this.bindSubClick.bind(this, '3') },
      { iconName: 'h4', name: 'h4', onclick: this.bindSubClick.bind(this, '4') },
      { iconName: 'h5', name: 'h5', onclick: this.bindSubClick.bind(this, '5') },
    ];
  }

  getSubMenuConfig() {
    return this.subMenuConfig;
  }

  /**
   * 解析快捷键，判断插入的标题级别
   * @param {string} shortKey 快捷键
   * @returns
   */
  $getFlagStr(shortKey) {
    const test = +(typeof shortKey === 'string' ? shortKey.replace(/[^0-9]+([0-9])/g, '$1') : shortKey);
    let header = '#';
    for (let i = 1; i < test; i++) {
      header += '#';
    }
    return header;
  }

  /**
   * 响应点击事件
   * @param {string} selection 被用户选中的文本内容
   * @param {string} shortKey 快捷键参数
   * @returns {string} 回填到编辑器光标位置/选中文本区域的内容
   */
  onClick(selection, shortKey = '') {
    // TODO: 1、改成获取整行内容进行判断； 2、根据#号个数判断是增加#号还是删除#号还是编辑#号
    // 如果选中的内容里有标题语法，则直接去掉该语法
    if (/^\s*(#+)\s*[\s\S]+/.test(selection)) {
      return selection.replace(/(^\s*)(#+)(\s*)([\s\S]+$)/gm, '$1$4');
    }
    const header = this.$getFlagStr(shortKey);
    let $selection = selection ? selection : '标题';
    // 如果选中的内容里不包含标题语法，则添加标题语法
    $selection = $selection.replace(/(^)([\s]*)([^\n]+)($)/gm, `$1${header} $3$4`);
    return $selection;
  }

  /**
   * 获得监听的快捷键
   * 在windows下是Ctrl+1，在mac下是cmd+1
   */
  get shortcutKeys() {
    return ['Mod-1', 'Mod-2', 'Mod-3', 'Mod-4', 'Mod-5', 'Mod-6'];
  }
}
