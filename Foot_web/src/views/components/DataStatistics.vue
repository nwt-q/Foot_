<template>
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 统计数据
const statistics = ref({
  totalPlayers: 23,
  averageScore: 7.8,
  winRate: 65
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

</style>