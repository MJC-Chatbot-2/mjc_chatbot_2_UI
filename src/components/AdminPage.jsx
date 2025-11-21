import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
  const navigate = useNavigate();

  const [timeframe, setTimeframe] = useState('daily'); // daily | weekly | monthly | yearly
  const [viewMode, setViewMode] = useState('all'); // all | department | student | staff
  const [chartData, setChartData] = useState([]);
  const [summary, setSummary] = useState({
    totalTokens: 0,
    avgTokens: 0,
    maxTokens: 0,
    periodLabel: '',
  });

  // 🔹 실제로는 여기를 API 연동으로 교체하면 됨
  const mockDailyData = [
    { label: '2025-11-17', tokens: 13240 },
    { label: '2025-11-18', tokens: 15890 },
    { label: '2025-11-19', tokens: 12110 },
    { label: '2025-11-20', tokens: 18720 },
    { label: '2025-11-21', tokens: 20430 },
  ];

  const mockWeeklyData = [
    { label: '2025년 10월 4주차', tokens: 80230 },
    { label: '2025년 11월 1주차', tokens: 92110 },
    { label: '2025년 11월 2주차', tokens: 103420 },
    { label: '2025년 11월 3주차', tokens: 112380 },
  ];

  const mockMonthlyData = [
    { label: '2025년 8월', tokens: 212340 },
    { label: '2025년 9월', tokens: 243120 },
    { label: '2025년 10월', tokens: 268900 },
    { label: '2025년 11월', tokens: 301450 },
  ];

  const mockYearlyData = [
    { label: '2022년', tokens: 512340 },
    { label: '2023년', tokens: 934210 },
    { label: '2024년', tokens: 1423450 },
    { label: '2025년', tokens: 1768920 },
  ];

  // timeframe, viewMode 변경 시마다 데이터 세팅
  useEffect(() => {
    let data = [];
    let periodLabel = '';

    // 현재는 viewMode가 "전체" 기준만 의미 있음
    switch (timeframe) {
      case 'daily':
        data = mockDailyData;
        periodLabel = '최근 5일 기준';
        break;
      case 'weekly':
        data = mockWeeklyData;
        periodLabel = '최근 4주 기준';
        break;
      case 'monthly':
        data = mockMonthlyData;
        periodLabel = '최근 4개월 기준';
        break;
      case 'yearly':
        data = mockYearlyData;
        periodLabel = '연도별 전체 기준';
        break;
      default:
        data = mockDailyData;
        periodLabel = '최근 5일 기준';
    }

    const totalTokens = data.reduce((sum, d) => sum + d.tokens, 0);
    const avgTokens = data.length ? Math.round(totalTokens / data.length) : 0;
    const maxTokens = data.length
      ? Math.max(...data.map((d) => d.tokens))
      : 0;

    setChartData(data);
    setSummary({
      totalTokens,
      avgTokens,
      maxTokens,
      periodLabel,
    });
  }, [timeframe, viewMode]);

  const formatNumber = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <h1 className="admin-title">명지전문대학 학사 챗봇 토큰 사용량</h1>
          <p className="admin-subtitle">
            학교 구성원들이 학사 챗봇을 사용할 때 발생하는 토큰 사용량을
            일/주/월/년 단위로 모니터링합니다.
          </p>
        </div>
        <button className="admin-home-button" onClick={handleGoHome}>
          메인으로
        </button>
      </header>

      {/* 상단 필터 영역 */}
      <section className="admin-filters">
        <div className="admin-filter-group">
          <span className="filter-label">기간 단위</span>
          <div className="filter-chips">
            <button
              className={`chip ${timeframe === 'daily' ? 'chip-active' : ''}`}
              onClick={() => setTimeframe('daily')}
            >
              일별
            </button>
            <button
              className={`chip ${timeframe === 'weekly' ? 'chip-active' : ''}`}
              onClick={() => setTimeframe('weekly')}
            >
              주별
            </button>
            <button
              className={`chip ${timeframe === 'monthly' ? 'chip-active' : ''}`}
              onClick={() => setTimeframe('monthly')}
            >
              월별
            </button>
            <button
              className={`chip ${timeframe === 'yearly' ? 'chip-active' : ''}`}
              onClick={() => setTimeframe('yearly')}
            >
              연별
            </button>
          </div>
        </div>

        <div className="admin-filter-group">
          <span className="filter-label">보기 기준</span>
          <div className="filter-chips">
            <button
              className={`chip ${viewMode === 'all' ? 'chip-active' : ''}`}
              onClick={() => setViewMode('all')}
            >
              전체
            </button>
            <button className="chip chip-disabled" disabled>
              학과별 (준비중)
            </button>
            <button className="chip chip-disabled" disabled>
              학생별 (준비중)
            </button>
            <button className="chip chip-disabled" disabled>
              교수·교직원별 (준비중)
            </button>
          </div>
        </div>
      </section>

      {/* 요약 카드 영역 */}
      <section className="metrics-grid">
        <div className="metric-card">
          <h3>전체 토큰 사용량</h3>
          <p className="metric-value">
            {formatNumber(summary.totalTokens)}
            <span className="metric-unit"> tokens</span>
          </p>
          <p className="metric-caption">{summary.periodLabel}</p>
        </div>

        <div className="metric-card">
          <h3>평균 토큰 사용량</h3>
          <p className="metric-value">
            {formatNumber(summary.avgTokens)}
            <span className="metric-unit"> tokens / 구간</span>
          </p>
          <p className="metric-caption">선택된 기간 단위 평균</p>
        </div>

        <div className="metric-card">
          <h3>최대 토큰 사용량</h3>
          <p className="metric-value">
            {formatNumber(summary.maxTokens)}
            <span className="metric-unit"> tokens</span>
          </p>
          <p className="metric-caption">가장 많이 사용된 구간</p>
        </div>
      </section>

      {/* 간단 바 차트 + 표 */}
      <section className="chart-section">
        <div className="chart-header">
          <h2>
            {timeframe === 'daily' && '일별 토큰 사용량'}
            {timeframe === 'weekly' && '주별 토큰 사용량'}
            {timeframe === 'monthly' && '월별 토큰 사용량'}
            {timeframe === 'yearly' && '연별 토큰 사용량'}
          </h2>
          <p className="chart-description">
            실제 운영 환경에서는 이 영역을 차트 라이브러리(Recharts, Chart.js 등)로
            교체해 사용할 수 있습니다. 현재는 토큰 사용량 비율을 막대 길이로
            표현합니다.
          </p>
        </div>

        <div className="chart-container">
          {chartData.length === 0 ? (
            <p className="chart-empty">표시할 데이터가 없습니다.</p>
          ) : (
            chartData.map((item) => {
              const ratio =
                summary.maxTokens > 0
                  ? (item.tokens / summary.maxTokens) * 100
                  : 0;
              return (
                <div className="chart-row" key={item.label}>
                  <div className="chart-row-label">{item.label}</div>
                  <div className="chart-row-bar-wrapper">
                    <div
                      className="chart-row-bar"
                      style={{ width: `${ratio}%` }}
                    />
                  </div>
                  <div className="chart-row-value">
                    {formatNumber(item.tokens)} tokens
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
