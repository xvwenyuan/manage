<template>
  <div class="index">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="center">
        <div>欢迎登陆!</div>
        <p>说明：默认的普通管理员只有部分权限包括：商品上下架、商品查询，商品添加、商品编辑和开团设置则需要超级管理员才有权限</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
// .index{
//     width: 100%;
//     height: 100%;
// }
.center {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
p {
  margin: 50px 0;
  line-height: 30px;
}
.el-card {
  height: 500px;
  width: 100%;
}
.el-breadcrumb{
    margin-bottom: 20px;
}
</style>