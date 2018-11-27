<template>
    <div>
        <!-- 顶部工具条 -->
        <div class="tools-bar">
            <div class="button-list">
                <el-select v-model="filterVal" placeholder="请选择分类">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in filterData" :key="item._id" :label="item.name" :value="item.name"></el-option>
                </el-select>
                <el-input v-model="searchVal" placeholder="请输入关键字"></el-input>
                <el-button size="small" class="search-btn" @click.native="handleSearch" >搜索</el-button>
                <el-button size="small" type="danger" class="add-btn" @click.native="handleAdd" >新增</el-button>
            </div>
        </div>
        <!-- table表格 -->
        <div class="table-wrap">
            <el-table :data="tableData" style="margin-top: 10px; border: 1px solid #ebeef5;">
                <el-table-column prop="title" label="标题" width="300">
                </el-table-column>
                <el-table-column label="图片" width="200">
                    <template slot-scope="scope">
                        <img :src="scope.row.img" alt="" style="width: 120px;">
                    </template>
                </el-table-column>
                <el-table-column prop="classify" label="分类" width="150">
                </el-table-column>
                <el-table-column prop="order" label="排序" width="150">
                </el-table-column>
                <el-table-column prop="isComment" label="是否可评论" width="100">
                    <template slot-scope="scope">
                        <el-switch 
                            v-model="scope.row.isComment" 
                            active-color="#26B99A" 
                            inactive-color="#DCDFE6"
                            @change="handleSwitch(scope.row)" 
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="200">
                    <template slot-scope="scope">
                        <div class="button-list">
                            <el-button  @click="onEdit(scope.row)">
                                <i class="el-icon-edit"></i>编辑
                            </el-button>
                            <el-button type="danger" @click="onDelete(scope.row)">
                                <i class="el-icon-delete"></i>删除
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background layout="prev, pager, next" :total="pageTotal" :current-page="pageCurrent" :page-size="pageSize" @current-change="onPageChange">
            </el-pagination>
        </div>
        <!-- 新增/编辑 -->
        <el-dialog :title="editTitle" :visible.sync="editFormVisible">
            <el-form v-loading="editStatus == 'loading'" :model="editForm" :rules="rules" ref="editForm" label-width="100px">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="editForm.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片" prop="url">
                    <el-upload
                    class="avatar-uploader"
                    action=""
                    :auto-upload="false"
                    :on-change="handleUpload"
                    :show-file-list="false"
                    >
                    <img v-if="editForm.img" :src="editForm.img" class="avatar" >
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="选择分类" prop="classify">
                    <el-select v-model="editForm.classify" placeholder="请选择显示位置">
                        <el-option v-for="item in filterData" :key="item._id" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否可评论" prop="isComment">
                    <el-switch v-model="editForm.isComment" active-color="#26B99A" inactive-color="#DCDFE6">
                    </el-switch>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <my-editor :content="editForm.content" @changeContent="changeContent"></my-editor>
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
import { Editor } from "../../components";
import { axiosUpload } from '../../api';
const _editForm = {
    _id: '',
    title: '',
    img: '',
    classify: '',
    content: '',
    order: '',
    isComment: true
}

export default {
    data() {
        return {
            filterVal: '',
            searchVal: '',
            editForm: Object.assign({}, _editForm),
            editTitle: '',
            editFormVisible: false,
            rules: {
                title: [
                    { required: true, message: "请输入标题", trigger: "change" }
                ],
                img: [
                    { required: true, message: "请选择图片", trigger: "change" }
                ],
                classify: [
                    { required: true, message: "请选择分类", trigger: "change" }
                ],
                content: [
                    { required: true, message: "请输入内容", trigger: "change" }
                ],
                order: [
                    { required: true, message: "请输入排序", trigger: "change" }
                ],
            }
        }
    },
    components: {
        "my-editor": Editor
    },
    methods: {
        changeContent(data) {
            this.editForm.content = data;
        },
        onEdit(row) {
            this.$refs["editForm"] && this.$refs["editForm"].resetFields();
            this.editTitle = "编辑";
            for (let key in this.editForm) {
                this.editForm[key] = row[key];
            }
            console.log(this.editForm);
            this.$nextTick(function() {
                this.editFormVisible = true;
            });
        },
        handleUpload(file, fileList) {
            const raw = file.raw;
            if (/image\/(jpeg|png|gif|jpg)/.test(raw.type)) {
                let formData = new FormData();
                formData.append('file', raw);
                axiosUpload(formData).then( data => {
                   this.editForm.img = data; 
                });
            }else{
                this.$message.error("只能上传图片");
            }
        },
        handleSearch() {
            const params = {
                keywords: this.searchVal,
                pos: this.filterVal
            }
            this.$store.dispatch('SEARCH_INFOLIST_TABLELIST', {
                params
            });
        },
        handleAdd() {
            this.$refs["editForm"] && this.$refs["editForm"].resetFields();
            this.editTitle = "新增";
            this.editForm = Object.assign({}, _editForm);
            this.$nextTick(function() {
                this.editFormVisible = true;
            });
        },
        handleSwitch(row) {
            const {
                _id,
                title,
                img,
                classify,
                content,
                order,
                isComment
            } = row;

            this.$store.dispatch(`EDIT_BANNER_HANDLER`, {
                params:  {
                    _id,
                    title,
                    img,
                    classify,
                    content,
                    order,
                    isComment
                },
                type: 'list'
            });
        },
        onEditSubmit() {
            const _this = this;
            this.$refs["editForm"].validate(valid => {
                if (valid) {
                let params = Object.assign({}, this.editForm);
                this.$store.dispatch(`EDIT_INFOLIST_HANDLER`, {
                    params: params,
                    type: 'list',
                    cb: function() {
                        _this.editFormVisible = false;
                    }
                });
                } else {
                    return false;
                }
            });
        },
    },
    mounted() {
        this.$loadingBar.start();
        this.$store.dispatch(`GET_INFOLIST_FILTERS`, () => {
            this.$store.dispatch('GET_INFOLIST_TABLELIST',(bol) => {
                if(bol){
                    this.$loadingBar.finish();
                }else{
                    this.$loadingBar.error();
                }
            });
        })
    }
}
</script>

<style lang="scss" scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    .el-upload:hover {
        border-color: #409EFF;
    }
}
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
