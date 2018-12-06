http://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.11&manage_type=myprojects&projectId=819561

将以下代码加到ico font.css中去，注意：el-myicon是你之前设置的icon前缀，第二个el-myicon前边有空格的
[class^="el-myicon"], [class*=" el-myicon"]/*这里有空格*/
{ 
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
}

备注：每次图标库有新增图标，需将新的Font Class文件覆盖，并添加如上代码。