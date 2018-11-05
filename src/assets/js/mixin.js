/*
 * 自定义混入对象
 * 增删查改 公用属性或者方法
 */

const mixin = {
  data() {
    return {
      searchVal: '',
      areaId: null,
      infoClassifyId: null,
      projectId: null,
      //页面模块名称 -- common
      moduleName: this.$route && this.$route.meta.module,
    }
  },
  computed: {
    //每页数量 -- common
    pageSize() {
      return this.$store.getters[`${this.moduleName}_PAGESIZE`];
    },
    //table数据加载状态
    tbStatus() {
      return this.$store.getters[`${this.moduleName}_TBSTATUS`];
    },
    //每页数量 -- common
    pageSize() {
      return this.$store.getters[`${this.moduleName}_PAGESIZE`];
    },
    //数据总数 -- common
    pageTotal() {
      return this.$store.getters[`${this.moduleName}_LISTCOUNT`];
    },
    //当前页码 -- common
    pageCurrent() {
      return this.$store.getters[`${this.moduleName}_PAGECURRENT`];
    },
    //列表数据 -- common
    tableData() {
      return this.$store.getters[`${this.moduleName}_TABLELIST`];
    },
    //过滤数据 -- common
    filterData() {
      return this.$store.getters[`${this.moduleName}_FILTERS`];
    },
    //编辑加载状态
    editStatus() {
      return this.$store.getters[`${this.moduleName}_EDITSTATUS`];
    },
    //当前页码 -- common
    pageCurrent() {
      return this.$store.getters[`${this.moduleName}_PAGECURRENT`];
    },
    //列表数据 -- common
    tableData() {
      return this.$store.getters[`${this.moduleName}_TABLELIST`];
    },
    //过滤数据 -- common
    filterData() {
      return this.$store.getters[`${this.moduleName}_FILTERS`];
    }
  },
  methods: {
    //搜索 -- common
    onSeach() {
      const params = {
        keyWord: this.searchVal,
      }
      if (this.areaId) {
        params['areaId'] = this.areaId
      }
      if (this.infoClassifyId) {
        params['infoClassifyId'] = this.infoClassifyId
      }
      if (this.projectId) {
        params['projectId'] = this.projectId
      }
      this.$store.dispatch(`SEARCH_${this.moduleName}_TABLELIST`, {
        params
      });
    },
    //页码切换 -- common
    onPageChange(num) {
      this.$store.dispatch(`CHANGE_${this.moduleName}_TABLELIST`, num);
    },
    //修改状态 -- common
    onChangeStatus(row) {
      this.$store.dispatch(`CHECKSTATUS_${this.moduleName}_HANDLER`, {
        params: {
          id: row.id,
          status: row.status
        },
        type: 'list'
      });
    },
    //删除 -- common
    onDelete(row) {
      this.$confirm('是否删除该记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch(`DEL_${this.moduleName}_HANDLER`, {
          params: {
            id: row.id
          },
          type: 'list'
        });
      })
    },
  }
}

export default mixin;
