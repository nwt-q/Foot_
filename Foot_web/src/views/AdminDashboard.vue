<template>
  <div class="admin-dashboard">
    <div class="header">
      <h1>后台管理系统</h1>
      <p class="subtitle">足球俱乐部综合管理平台</p>
    </div>

    <div class="dashboard-grid">
      <!-- 用户管理模块 -->
      <div class="dashboard-card">
        <div class="card-header">
          <i class="icon">👥</i>
          <h2>用户管理</h2>
        </div>
        <div class="card-content">
          <button class="action-btn" @click="showUserManagement('player')">
            <i class="icon">⚽</i>
            <span>球员管理</span>
          </button>
          <button class="action-btn" @click="showUserManagement('coach')">
            <i class="icon">📋</i>
            <span>教练管理</span>
          </button>
          <button class="action-btn" @click="showUserManagement('admin')">
            <i class="icon">🔑</i>
            <span>管理员管理</span>
          </button>
        </div>
      </div>

      <!-- 数据统计模块 -->
      <div class="dashboard-card">
        <div class="card-header">
          <i class="icon">📊</i>
          <h2>数据统计</h2>
        </div>
        <div class="card-content">
          <button class="action-btn" @click="showStatistics('performance')">
            <i class="icon">📈</i>
            <span>球员表现</span>
          </button>
          <button class="action-btn" @click="showStatistics('training')">
            <i class="icon">🏃</i>
            <span>训练数据</span>
          </button>
          <button class="action-btn" @click="showStatistics('match')">
            <i class="icon">🏆</i>
            <span>比赛数据</span>
          </button>
        </div>
      </div>

      <!-- 系统配置模块 -->
      <div class="dashboard-card">
        <div class="card-header">
          <i class="icon">⚙️</i>
          <h2>系统配置</h2>
        </div>
        <div class="card-content">
          <button class="action-btn" @click="showSettings('permissions')">
            <i class="icon">🔒</i>
            <span>权限设置</span>
          </button>
          <button class="action-btn" @click="showSettings('system')">
            <i class="icon">💻</i>
            <span>系统设置</span>
          </button>
          <button class="action-btn" @click="showSettings('backup')">
            <i class="icon">💾</i>
            <span>数据备份</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 模态框组件 -->
    <div v-if="modalVisible" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ modalTitle }}</h2>
          <span class="close" @click="closeModal">&times;</span>
        </div>
        <div class="modal-body">
          <component :is="currentComponent.value" @close="closeModal"></component>
        </div>
      </div>
    </div>
  </div>

  <button class="action-btna" @click="inyin">
            <i class="icon">🔒</i>
            <span>进入系统</span>
  </button>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserManagement from './components/UserManagement.vue'
import DataStatistics from './components/DataStatistics.vue'
import {useRouter} from 'vue-router'

// 模态框状态
const modalVisible = ref(false)
const modalTitle = ref('')
const currentComponent = ref()


const router = useRouter() 

// 用户管理功能
function showUserManagement(type: string) {
  modalVisible.value = true
  switch (type) {
    case 'player':
      modalTitle.value = '球员管理'
      currentComponent.value = 'UserManagement'
      break
    case 'coach':
      modalTitle.value = '教练管理'
      currentComponent.value = 'UserManagement'
      break
    case 'admin':
      modalTitle.value = '管理员管理'
      currentComponent.value = 'UserManagement'
      break
  }
}

// 数据统计功能
function showStatistics(type: string) {
  modalVisible.value = true
  switch (type) {
    case 'performance':
      modalTitle.value = '球员表现统计'
      currentComponent.value = 'DataStatistics'
      break
    case 'training':
      modalTitle.value = '训练数据统计'
      currentComponent.value = 'DataStatistics'
      break
    case 'match':
      modalTitle.value = '比赛数据统计'
      currentComponent.value = 'DataStatistics'
      break
  }
}

// 系统设置功能
function showSettings(type: string) {
  modalVisible.value = true
  switch (type) {
    case 'permissions':
      modalTitle.value = '权限设置'
      currentComponent.value = 'SystemSettings'
      break
    case 'system':
      modalTitle.value = '系统设置'
      currentComponent.value = 'SystemSettings'
      break
    case 'backup':
      modalTitle.value = '数据备份'
      currentComponent.value = 'SystemSettings'
      break
  }
}

function inyin(){
  router.push('/cav')
}

// 关闭模态框
function closeModal() {
  modalVisible.value = false
  modalTitle.value = ''
  currentComponent.value = null
}
const components = {
  UserManagement,
  DataStatistics,
}

</script>

<style scoped>
.action-btna{
  margin-top: 10vh;
  margin-left: 40vw;

  display: flex;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.system-settings {
  max-width: 600px;
  margin: 0 auto;
}
.unit {
  margin-left: 10px;
  color: #606266;
}
.stat-card {
  text-align: center;
  padding: 20px;
}
.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
}
.stat-title {
  margin-top: 10px;
  color: #606266;
}
.chart-container {
  margin-top: 30px;
}

.admin-dashboard {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.2rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.dashboard-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s ease;
}

.dashboard-card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card-header .icon {
  font-size: 1.8rem;
  margin-right: 1rem;
}

.card-header h2 {
  color: #2c3e50;
  margin: 0;
  font-size: 1.5rem;
}

.card-content {
  display: grid;
  gap: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: #e9ecef;
  transform: translateX(5px);
}

.action-btn .icon {
  font-size: 1.2rem;
  margin-right: 1rem;
}

.action-btn span {
  font-size: 1rem;
  color: #2c3e50;
  font-weight: 500;
}

/* 模态框样式 */
.modal {
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

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h2 {
  margin: 0;
  color: #2c3e50;
}

.close {
  font-size: 1.5rem;
  cursor: pointer;
  color: #7f8c8d;
}

.modal-body {
  padding: 1.5rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .admin-dashboard {
    padding: 1rem;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 2rem;
  }

  .modal-content {
    width: 95%;
    margin: 1rem;
  }
}
</style>