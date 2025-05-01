<template>
  <div class="admin-dashboard">
    <el-container>
  
      <el-container>
        <el-header height="60px" class="dashboard-header">
          <h2>足球俱乐部管理系统</h2>
          <el-dropdown>
            <span class="admin-info">
              <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
              <span>管理员</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>

        <el-main>
          <div class="data-statistics">
    <!-- 数据概览卡片 -->
    <div class="stats-overview">
      <div class="stat-card">
        <div class="stat-icon">👥</div>
        <div class="stat-info">
          <h3>总球员数</h3>
          <p class="stat-value">{{ statistics.totalPlayers }}</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-info">
          <h3>平均得分</h3>
          <p class="stat-value">{{ statistics.averageScore }}</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🎯</div>
        <div class="stat-info">
          <h3>胜率</h3>
          <p class="stat-value">{{ statistics.winRate }}%</p>
        </div>
      </div>
    </div>

    <!-- 数据图表区域 -->
    <div class="charts-container">
      <!-- 表现趋势图 -->
      <div class="chart-section">
        <h3>球员表现趋势</h3>
        <div class="chart-placeholder">
          <!-- 这里可以集成实际的图表组件 -->
          <div class="chart-demo performance">
            <div v-for="(value, index) in performanceData" 
                 :key="index" 
                 class="chart-bar"
                 :style="{ height: value + '%' }">
            </div>
          </div>
        </div>
      </div>

      <!-- 训练完成度 -->
      <div class="chart-section">
        <h3>训练完成情况</h3>
        <div class="chart-placeholder">
          <div class="chart-demo training">
            <div class="progress-ring">
              <div class="progress-circle" 
                   :style="{ transform: `rotate(${trainingProgress}deg)` }">
              </div>
              <span class="progress-text">{{ Math.round(trainingProgress / 3.6) }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 详细数据表格 -->
    <div class="data-table">
      <h3>详细数据</h3>
       <div class="sr-icon" @click="handleClick">🎯 人员管理</div>
      <table>
        <thead>
          <tr>
            <th>球员</th>
            <th>出场次数</th>
            <th>进球</th>
            <th>助攻</th>
            <th>评分</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in playerStats" :key="player.id">
            <td>{{ player.name }}</td>
            <td>{{ player.matches }}</td>
            <td>{{ player.goals }}</td>
            <td>{{ player.assists }}</td>
            <td>{{ player.rating }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, BarChart, LineChart } from 'echarts/charts'
import {
  useRouter
} from 'vue-router'

import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
])

const router = useRouter()

const handleClick = () => {
  console.log('点击了添加按钮')
  router.push('/caww')
}
// 统计数据
const statistics = ref({
  totalPlayers: 25,
  totalCoaches: 5,
  totalMatches: 30,
  winRate: 65,
  averageScore : 11,
})

// 球员数据
const players = ref([
  { id: 1, name: '张三', age: 25, position: '前锋', status: '正常' },
  { id: 2, name: '李四', age: 28, position: '中场', status: '受伤' }
])

// 教练数据
const coaches = ref([
  { id: 1, name: '王教练', experience: 10, type: '主教练' },
  { id: 2, name: '李教练', experience: 8, type: '助理教练' }
])

// 比赛记录
const matches = ref([
  { id: 1, date: '2023-10-01', opponent: '北京队', result: '2:1', type: '联赛' },
  { id: 2, date: '2023-10-08', opponent: '上海队', result: '1:1', type: '杯赛' }
])

// 系统设置
const systemSettings = ref({
  name: '足球俱乐部管理系统',
  backupFrequency: 'daily',
  notifications: true
})

// 年龄分布图表配置
const ageDistributionOption = ref({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: '年龄分布',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 8, name: '20岁以下' },
        { value: 12, name: '20-25岁' },
        { value: 10, name: '26-30岁' },
        { value: 5, name: '30岁以上' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})

// 比赛成绩图表配置
const matchResultOption = ref({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['胜', '平', '负']
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '胜',
      type: 'bar',
      stack: 'total',
      data: [3, 2, 4, 3, 2, 3]
    },
    {
      name: '平',
      type: 'bar',
      stack: 'total',
      data: [1, 2, 1, 2, 1, 1]
    },
    {
      name: '负',
      type: 'bar',
      stack: 'total',
      data: [1, 1, 0, 1, 2, 1]
    }
  ]
})


// 表现趋势数据
const performanceData = ref([30, 45, 60, 75, 65, 80, 70])

// 训练完成度
const trainingProgress = ref(270) // 75% * 360

// 球员统计数据
const playerStats = ref([
  { id: 1, name: '张三', matches: 15, goals: 8, assists: 5, rating: 8.5 },
  { id: 2, name: '李四', matches: 14, goals: 6, assists: 7, rating: 8.2 },
  { id: 3, name: '王五', matches: 13, goals: 5, assists: 4, rating: 7.9 },
  { id: 4, name: '赵六', matches: 12, goals: 4, assists: 6, rating: 7.8 }
])

onMounted(() => {
  // 这里可以添加实际的数据获取逻辑
})

</script>

<style scoped>

.data-statistics {
  padding: 1.5rem;
}

/* 数据概览卡片样式 */
.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.table-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 1rem;
}
.stat-icon {
  font-size: 2.5rem;
}

.sr-icon{
  font-size: 1.5rem;
  margin-left: 70vw;
}


.stat-info h3 {
  margin: 0;
  color: #666;
  font-size: 1rem;
}

.stat-value {
  margin: 0.5rem 0 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
}

/* 图表容器样式 */
.charts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.chart-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chart-section h3 {
  margin: 0 0 1rem;
  color: #2c3e50;
}

/* 演示图表样式 */
.chart-placeholder {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-demo.performance {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 1rem;
}

.chart-bar {
  width: 12%;
  background: linear-gradient(to top, #3498db, #2980b9);
  border-radius: 4px 4px 0 0;
  transition: height 0.3s ease;
}

.chart-demo.training {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.progress-ring {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: #f0f0f0;
  position: relative;
  overflow: hidden;
}

.progress-circle {
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  background: #3498db;
  transform-origin: left;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
}

/* 数据表格样式 */
 /* 数据表格样式 */
 .data-table {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .data-table h3 {
      margin: 0;
      color: #2c3e50;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    th {
      font-weight: 600;
      color: #2c3e50;
      background: #f8f9fa;
    }

    td {
      color: #666;
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .stat-icon {
      margin-right: 0.5rem;
    }

/* 响应式设计 */
@media (max-width: 768px) {
  .data-statistics {
    padding: 1rem;
  }

  .stats-overview {
    grid-template-columns: 1fr;
  }

  .charts-container {
    grid-template-columns: 1fr;
  }

  .chart-placeholder {
    height: 150px;
  }

  .data-table {
    overflow-x: auto;
  }

  table {
    font-size: 0.9rem;
  }

  th, td {
    padding: 0.75rem;
  }
}

.admin-dashboard {
  height: 100vh;
  background-color: #f0f2f5;
}

.side-menu {
  height: 100vh;
  background-color: #001529;
}

.dashboard-header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.admin-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.admin-info span {
  margin-left: 8px;
}

.data-cards {
  margin-bottom: 20px;
}

.data-card {
  .card-header {
    display: flex;
    align-items: center;
    
    .el-icon {
      margin-right: 8px;
      font-size: 20px;
    }
  }

  .card-content {
    text-align: center;
    padding: 20px 0;

    .number {
      font-size: 24px;
      font-weight: bold;
      color: #409EFF;
    }

    .unit {
      margin-left: 4px;
      font-size: 14px;
      color: #909399;
    }
  }
}

.chart-card {
  margin-bottom: 20px;
  
  :deep(.echarts) {
    height: 300px;
  }
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .el-aside {
    width: 64px !important;
  }

  .el-menu {
    width: 64px;
  }

  .el-menu-item span {
    display: none;
  }

  .data-cards .el-col {
    width: 100%;
    margin-bottom: 10px;
  }

  .charts-container .el-col {
    width: 100%;
  }
}
</style>