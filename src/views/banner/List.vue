<template>
    <div>
        <!-- 顶部工具条 -->
        <div class="tools-bar">
            <div class="button-list">
                <el-select placeholder="请选择显示位置">
                    <el-option label="首页" value="1"></el-option>
                    <el-option label="师生作品" value="2"></el-option>
                </el-select>
                <el-input v-model="searchVal" placeholder="请输入关键字"></el-input>
                <el-button size="small" class="search-btn" >搜索</el-button>
                <el-button size="small" type="danger" class="add-btn" >新增</el-button>
            </div>
        </div>
        <!-- table表格 -->
        <div class="table-wrap">
            <el-table :data="tableData" style="margin-top: 10px; border: 1px solid #ebeef5;">
                <el-table-column prop="title" label="标题" width="300">
                </el-table-column>
                <el-table-column label="图标" width="200">
                    <template slot-scope="scope">
                        <img :src="scope.row.url" alt="" style="width: 120px;">
                    </template>
                </el-table-column>
                <el-table-column prop="pos" label="位置" width="150">
                </el-table-column>
                <el-table-column prop="isShow" label="是否可见" width="100">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.isShow" active-color="#26B99A" inactive-color="#DCDFE6" >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="200">
                    <template slot-scope="scope">
                        <div class="button-list">
                            <el-button  @click="onEdit(scope.row)">
                                <i class="el-icon-edit"></i>编辑
                            </el-button>
                            <el-button type="danger">
                                <i class="el-icon-delete"></i>删除
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background layout="prev, pager, next" :total="1" :page-size="20">
            </el-pagination>
        </div>
        <!-- 新增/编辑 -->
        <el-dialog :title="editTitle" :visible.sync="editFormVisible">
            <el-form :model="editForm" ref="editForm" label-width="100px">
                <el-form-item label="标题">
                    <el-input v-model="editForm.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload
                    action=""
                    :show-file-list="false"
                   >
                    <img v-if="editForm.url" :src="editForm.url" class="avatar" >
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="服务分类">
                    <el-select v-model="editForm.pos" placeholder="请选择服务分类">
                        <el-option label="首页" value="首页">
                        </el-option>
                        <el-option label="师生作品" value="师生作品">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否可见">
                    <el-switch v-model="editForm.isShow" active-color="#26B99A" inactive-color="#DCDFE6">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onEditSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
const _editForm = {
    _id: '',
    title: '',
    url: 'http://p.qpic.cn/smartcampus/0/25319022635486903/360',
    pos: '',
    isShow: true
}
export default {
    data() {
        return {
            searchVal: '',
            tableData:[
                {
                    title: '校园美景',
                    url: 'http://p.qpic.cn/smartcampus/0/25319022635486903/360',
                    pos: '首页',
                    isShow: true
                }
            ],
            editForm: Object.assign({}, _editForm),
            editTitle: '',
            editFormVisible: false,
            dialogVisible: false,
            dialogImageUrl: ''
        }
    },
    methods: {
        onEdit(row) {
            this.editTitle = "编辑";
            for (let key in this.editForm) {
                this.editForm[key] = row[key];
            }

            this.$nextTick(function() {
                this.editFormVisible = true;
            });
        },
        onEditSubmit() {
            
        }
    }
}
</script>
<style lang="scss" scoped>
.avatar {
    width: 178px;
    height: auto;
    display: block;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
</style>

