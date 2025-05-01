<template>
  <div class="user-management">
    <!-- 用户列表 -->
    <div class="user-list">
      <div class="list-header">
        <div class="search-bar">
          <input type="text" v-model="searchQuery" placeholder="搜索用户..." @input="filterUsers">
        </div>
        <button class="add-btn" @click="showAddUserForm">
          <i class="icon">➕</i>
          <span>添加用户</span>
        </button>
      </div>

      <div class="list-content">
        <table>
          <thead>
            <tr>
              <th>姓名</th>
              <th>角色</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.role }}</td>
              <td>
                <span :class="['status-badge', user.status]">{{ user.status }}</span>
              </td>
              <td class="actions">
                <button class="action-btn edit" @click="editUser(user)">
                  <i class="icon">✏️</i>
                </button>
                <button class="action-btn delete" @click="deleteUser(user)">
                  <i class="icon">🗑️</i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 添加/编辑用户表单 -->
    <div v-if="showForm" class="user-form-modal">
      <div class="form-content">
        <h3>{{ isEditing ? '编辑用户' : '添加用户' }}</h3>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label>姓名</label>
            <input type="text" v-model="formData.name" required>
          </div>
          <div class="form-group">
            <label>角色</label>
            <select v-model="formData.role" required>
              <option value="球员">球员</option>
              <option value="教练">教练</option>
              <option value="管理员">管理员</option>
            </select>
          </div>
          <div class="form-group">
            <label>状态</label>
            <select v-model="formData.status" required>
              <option value="active">活跃</option>
              <option value="inactive">非活跃</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="button" class="cancel-btn" @click="closeForm">取消</button>
            <button type="submit" class="submit-btn">{{ isEditing ? '保存' : '添加' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 用户数据
const users = ref([
  { id: 1, name: '张三', role: '球员', status: 'active' },
  { id: 2, name: '李四', role: '教练', status: 'active' },
  { id: 3, name: '王五', role: '管理员', status: 'inactive' }
])

// 搜索和筛选
const searchQuery = ref('')
const filteredUsers = computed(() => {
  return users.value.filter(user =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// 表单控制
const showForm = ref(false)
const isEditing = ref(false)
const formData = ref({
  id: null,
  name: '',
  role: '',
  status: 'active'
})

// 显示添加用户表单
function showAddUserForm() {
  isEditing.value = false
  formData.value = {
    id: null,
    name: '',
    role: '',
    status: 'active'
  }
  showForm.value = true
}

// 编辑用户
function editUser(user: any) {
  isEditing.value = true
  formData.value = { ...user }
  showForm.value = true
}

// 删除用户
function deleteUser(user: any) {
  if (confirm('确定要删除该用户吗？')) {
    users.value = users.value.filter(u => u.id !== user.id)
  }
}

// 提交表单
function submitForm() {
  if (isEditing.value) {
    const index = users.value.findIndex(u => u.id === formData.value.id)
    if (index !== -1) {
      users.value[index] = { ...formData.value } as any;
    }
  } else {
    const newId = Math.max(...users.value.map(u => u.id)) + 1
    users.value.push({
      ...formData.value,
      id: newId
    })
  }
  closeForm()
}

// 关闭表单
function closeForm() {
  showForm.value = false
  formData.value = {
    id: null,
    name: '',
    role: '',
    status: 'active'
  }
}

function filterUsers() {

}
</script>

<style scoped>
.user-management {
  padding: 1rem;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.search-bar input {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 250px;
}

.add-btn {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-btn:hover {
  background: #45a049;
}

.add-btn .icon {
  margin-right: 0.5rem;
}

/* 表格样式 */
table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background: #f5f5f5;
  font-weight: 600;
  color: #2c3e50;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.875rem;
}

.status-badge.active {
  background: #e8f5e9;
  color: #4caf50;
}

.status-badge.inactive {
  background: #ffebee;
  color: #f44336;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-btn.edit {
  background: #2196F3;
  color: white;
}

.action-btn.delete {
  background: #F44336;
  color: white;
}

.action-btn:hover {
  opacity: 0.9;
}

/* 表单模态框 */
.user-form-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.form-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.cancel-btn {
  padding: 0.5rem 1rem;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn {
  padding: 0.5rem 1rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background: #45a049;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .list-header {
    flex-direction: column;
    gap: 1rem;
  }

  .search-bar input {
    width: 100%;
  }

  .add-btn {
    width: 100%;
    justify-content: center;
  }

  .form-content {
    width: 95%;
    margin: 1rem;
  }
}
</style>