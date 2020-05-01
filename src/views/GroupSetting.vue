<template>
  <div class="groupsetting">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>开团设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="title">开团设置</div>
      <div class="deadtime">
        <label for>拼团期限(h)</label>
        <el-input-number v-model="num" @change="handleChange" :min="1" :max="120"></el-input-number>
      </div>
      <label for>成团人数</label>
      <el-select v-model="value" placeholder="请选择" @change="selectNum">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary" class="save" @click="saveSetting">保存</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 24,
      options: [
        {
          value: 2,
          label: "2人团"
        },
        {
          value: 3,
          label: "3人团"
        },
        {
          value: 4,
          label: "4人团"
        },
        {
          value: 5,
          label: "5人团"
        }
      ],
      value: 2,
      hour: 24,
      root: false
    };
  },
  methods: {
    handleChange(value) {
      this.hour = value;
    },
    selectNum() {},
    async saveSetting() {
      if (this.root) {
        await this.$http.post("/pc/groupsetting", {
          person: this.value,
          time: this.hour
        });
        this.$message({
          message: "保存成功",
          type: "success"
        });
      }else{
        this.$message('你还没有此权限');
      }
    }
  },
  mounted() {
    this.root = !!parseInt(this.$cookies.get("root"));
  }
};
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown {
  margin: 50px 0 50px 50px;
}
.el-input-number {
  margin-left: 40px;
}
.el-card {
  position: relative;
  height: 379px;
  padding: 60px;
}
.title {
  text-align: center;
  color: #666;
  font-size: 24px;
  margin-bottom: 50px;
}
.el-select {
  width: 180px;
  margin-left: 40px;
}
label {
  min-width: 85px;
  display: inline-block;
}
.deadtime {
  margin: 30px 0;
}
.save {
  display: block;
  margin-top: 30px;
  margin-left: 125px;
}
</style>>
