<template>
  <div class="goodslist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>普通商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="top">
        <label for>商品名称:</label>
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入"
          @select="handleSelect"
        ></el-autocomplete>
        <label for>商品状态:</label>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="twobtn">
          <el-button type="primary" @click="select" class="select">查询</el-button>
          <el-button type="white" class="addbtn" @click="showDialogVisible(addItem)">添加商品</el-button>
        </div>
      </div>
      <el-table :data="tableData" stripe border style="width: 100%" max-height="100%" class="goods">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品 ID" sortable>
                <span>{{ props.row.goods_id }}</span>
              </el-form-item>
              <el-form-item label="商品名称" sortable>
                <span>{{ props.row.goods_name }}</span>
              </el-form-item>
              <el-form-item label="商品描述" sortable>
                <el-popover
                  placement="top-start"
                  title="商品描述"
                  width="200"
                  trigger="hover"
                  :content="props.row.goods_desc"
                >
                  <span slot="reference">{{ props.row.goods_desc }}</span>
                </el-popover>
              </el-form-item>
              <el-form-item label="商品价格" sortable>
                <span>{{ props.row.goods_price }}</span>
              </el-form-item>
              <el-form-item label="商品图片路径" sortable>
                <el-popover
                  placement="top-start"
                  title="商品路径"
                  width="200"
                  trigger="hover"
                  :content="props.row.goods_url"
                >
                  <span slot="reference">{{ props.row.goods_url }}</span>
                </el-popover>
              </el-form-item>
              <el-form-item label="商品详情图片路径" sortable>
                <el-popover
                  placement="top-start"
                  title="详情图片路径"
                  width="200"
                  trigger="hover"
                  :content="props.row.goods_detailurl"
                >
                  <span slot="reference">{{ props.row.goods_detailurl }}</span>
                </el-popover>
              </el-form-item>
              <el-form-item label="状态(上下架)" sortable>
                <span>{{ props.row.issale==true?'上架':'下架' }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column label="商品 ID" prop="goods_id"></el-table-column>
        <el-table-column label="商品图片" prop="goods_url">
          <template slot-scope="props">
            <el-image
              style="width: 100px; height: 100px"
              :src="props.row.goods_url"
              fit="fill"
              :preview-src-list="[props.row.goods_url]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格(分)" prop="goods_price"></el-table-column>
        <el-table-column label="状态(上下架)" prop="issale">
          <template slot-scope="props">
            <el-switch
              v-model="props.row.issale"
              active-color="#13ce66"
              @change="changeSale(props.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              size="mini"
              type="primary"
              @click="showDialogVisible(scope.row)"
              icon="el-icon-edit"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
        :page-size="5"
        :hide-on-single-page="ishide"
        :current-page.sync="page"
      ></el-pagination>
    </el-card>
    <el-dialog
      :title="title"
      :visible.sync="setRightDialogVisible"
      center
      :close-on-click-modal="false"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="goods_id" label="商品ID" v-show="flag">
          <el-input type="text" v-model="ruleForm.goods_id"></el-input>
        </el-form-item>
        <el-form-item prop="goods_name" label="商品名称">
          <el-input type="text" v-model="ruleForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item prop="goods_price" label="商品价格(分)">
          <el-input type="text" v-model="ruleForm.goods_price"></el-input>
        </el-form-item>
        <el-form-item prop="goods_desc" label="商品描述">
          <el-input
            type="textarea"
            v-model="ruleForm.goods_desc"
            :autosize="{ minRows: 2, maxRows: 4}"
          ></el-input>
        </el-form-item>
        <el-form-item prop="goods_url" label="商品图片路径">
          <el-input type="text" v-model="ruleForm.goods_url"></el-input>
        </el-form-item>
        <el-form-item prop="goods_detailurl" label="商品详情图片路径">
          <el-input type="text" v-model="ruleForm.goods_detailurl"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submitForm('ruleForm')" class="comfire">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      setRightDialogVisible: false,
      ruleForm: {},
      rules: {
        goods_id: [
          {
            required: true,
            message: "请输入商品ID",
            trigger: "blur"
          }
        ],
        goods_name: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "blur"
          }
        ],
        goods_price: [
          {
            required: true,
            message: "请输入商品价格",
            trigger: "blur"
          }
        ],
        goods_desc: [
          {
            required: true,
            message: "请输入商品描述",
            trigger: "blur"
          }
        ],
        goods_url: [
          {
            required: true,
            message: "请输入商品图片路径",
            trigger: "blur"
          }
        ],
        goods_detailurl: [
          {
            required: true,
            message: "请输入商品详情图片路径",
            trigger: "blur"
          }
        ]
      },
      root: false,
      restaurants: [],
      state: "",
      timeout: null,
      page: 1,
      total: 0,
      ishide: false,
      isCurrent:true,
      options: [
        {
          value: 2,
          label: "全部"
        },
        {
          value: 0,
          label: "下架"
        },
        {
          value: 1,
          label: "上架"
        }
      ],
      value: 2,
      addItem: {
        goods_id: "",
        goods_name: "",
        goods_price: "",
        goods_desc: "",
        goods_url: "",
        goods_detailurl: "",
        issale: 1
      },
      flag: false,
      title: ""
    };
  },
  watch: {
    total(val) {
      if (val <= 5) {
        this.ishide = true;
      }
    }
  },
  methods: {
    showDialogVisible(row) {
      if (!row.goods_name) {
        this.flag = true;
        this.title = "商品添加";
      } else {
        this.flag = false;
        this.title = "商品编辑";
      }
      this.ruleForm = JSON.parse(JSON.stringify(row));
      this.setRightDialogVisible = true;
    },
    submitForm(formName) {
      if (this.root) {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            if (this.flag) {
              await this.$http.post("/pc/addgoods", this.ruleForm);
              this.$message({
                message: "添加成功",
                type: "success"
              });
            } else {
              await this.$http.post("/pc/editgoods", this.ruleForm);
              this.$message({
                message: "编辑成功",
                type: "success"
              });
            }
            this.setRightDialogVisible = false;
            this.getList();
          } else {
            this.$message.error("数据项不能为空!");
            return false;
          }
        });
      } else {
        this.$message("你还没有此权限");
      }
    },
    async handleCurrentChange() {
      if(this.isCurrent){
      this.getList();
      }else{
        this.getSelect()
      }
    },
    async getList() {
      await this.$http
        .post("/pc/goodlist", {
          page: this.page * 5 - 5
        })
        .then(res => {
          console.log(res.data);
          this.tableData = res.data.goodsList;
          this.total = res.data.total;
          this.tableData.forEach(item => {
            item.issale = !!item.issale;
          });
        });
    },
    async getSelect() {
      this.$http
        .post("/pc/select", {
          content: this.state,
          state: this.value,
          page: this.page * 5 - 5
        })
        .then(res => {
          this.tableData = res.data.result;
          this.total = res.data.total;
          console.log(res.data.result);
          this.tableData.forEach(item => {
            item.issale = !!item.issale;
          });
        });
    },
    changeSale(state) {
      let issale = Number(state.issale);
      let goods_id = state.goods_id;
      this.$http.post("/pc/issale", { issale, goods_id });
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    select() {
      this.isCurrent = false;
      this.page = 1;
      this.getSelect()
    },
    cancel() {
      this.setRightDialogVisible = false;
    }
  },
  async mounted() {
    await this.getList();
    let arr = this.tableData;
    for (let prop in arr) {
      let obj = { value: arr[prop].goods_name };
      this.restaurants.push(obj);
    }
    this.root = !!parseInt(this.$cookies.get("root"));
  }
};
</script>

<style lang="scss" scoped>
.el-card {
  height: 100%;
  min-height: 1000px;
}

.el-breadcrumb {
  margin-bottom: 20px;
}
.el-select {
  margin: 20px 114px 20px 0;
}
.el-autocomplete {
  margin-right: 20px;
}
label {
  margin-right: 20px;
}
.top {
  width: 100%;
  height: 80px;
}
.twobtn {
  height: 80px;
  width: 183px;
  float: right;
}
.addbtn {
  margin: 20px 0;
}
.select {
  margin: 20px 15px 20px 0;
}
.comfire {
  margin-right: 80px;
}
.el-pagination {
  text-align: center;
  margin: 20px 0;
}
</style>