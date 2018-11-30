<template>
    <div>
        <!-- 顶部工具条 -->
        <div class="tools-bar">
            <div class="button-list">
                <el-button size="small" type="danger" class="add-btn" @click.native="handleAdd" >新增</el-button>
            </div>
        </div>
        <!-- table表格 -->
        <div class="table-wrap">
            <el-table :data="tableData" style="margin-top: 10px; border: 1px solid #ebeef5;">
                <el-table-column prop="title" label="标题" width="300">
                </el-table-column>
                <el-table-column prop="order" label="排序" width="300">
                </el-table-column>
                <el-table-column label="操作" min-width="200">
                    <template slot-scope="scope">
                        <div class="button-list">
                            <el-button  @click="onEdit(scope.row)">
                                <i class="el-icon-edit"></i>编辑
                            </el-button>
                            <el-button type="danger" @click="handleDelete(scope.row)">
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
        <el-dialog :title="editTitle" :visible.sync="editFormVisible" @closed="dialogClosed">
            <el-form v-loading="editStatus == 'loading'" :model="editForm" :rules="rules" ref="editForm" label-width="100px">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="editForm.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片" prop="imgs">
                    <el-upload
                        action=""
                        multiple
                        :auto-upload="false"
                        list-type="picture-card"
                        :file-list="fileList"
                        :on-change="handleUpload"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="排序" prop="order">
                    <el-input v-model="editForm.order" auto-complete="off"></el-input>
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
import { axiosUpload } from '../../api';
const _editForm = {
    _id: '',
    title: '',
    imgs: '',
    order: ''
}
export default {
    data() {
        return {
            editForm: Object.assign({}, _editForm),
            editTitle: '',
            editFormVisible: false,
            fileList: [],
            rules: {
                title: [
                    { required: true, message: "请输入标题", trigger: "change" }
                ],
                imgs: [
                    { required: true, message: "请选择图片", trigger: "change" }
                ],
                order: [
                    { required: true, message: "请输入排序", trigger: "change" }
                ]
            }
        }
    },
    methods: {
        onEdit(row) {
            this.$refs["editForm"] && this.$refs["editForm"].resetFields();
            this.editTitle = "编辑";
            this.fileList = [];
            for (let key in this.editForm) {
                this.editForm[key] = row[key];
            }
            if(row.imgs !== undefined){
                const imgs = row.imgs.split(',');
                this.fileList = imgs.map(img => {
                    return {
                        url: img
                    }
                });
            }

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
                    let imgArr = this.editForm.imgs === undefined ? [] : this.editForm.imgs.split(',');
                    imgArr.push(data);
                    this.fileList = imgArr.map(img => {
                        return {
                            url: img
                        }
                    });
                    this.editForm.imgs = imgArr.join(',');
                });
            }else{
                this.$message.error("只能上传图片");
            }
        },
        handleRemove(file, fileList) {
            const imgArr = this.editForm.imgs.split(',');
            imgArr.splice(imgArr.indexOf(file.url), 1);
            this.editForm.imgs = imgArr.join(',');
        },
        handleAdd() {
            this.$refs["editForm"] && this.$refs["editForm"].resetFields();
            this.editTitle = "新增";
            this.editForm = Object.assign({}, _editForm);
            this.$nextTick(function() {
                this.editFormVisible = true;
            });
        },
        handleDelete(row) {
            this.$confirm('是否删除该记录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch(`DEL_LIFE_HANDLER`, {
                    params: {
                        title: row._id
                    },
                    type: 'list'
                });
            })
        },
        onEditSubmit() {
            const _this = this;
            this.$refs["editForm"].validate(valid => {
                if (valid) {
                let params = Object.assign({}, this.editForm);
                this.$store.dispatch(`EDIT_LIFE_HANDLER`, {
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
        dialogClosed() {
            this.fileList = [];
        }
    },
    mounted() {
        this.$loadingBar.start();
        this.$store.dispatch('GET_LIFE_TABLELIST',(bol) => {
            if(bol){
                this.$loadingBar.finish();
            }else{
                this.$loadingBar.error();
            }
        });
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

