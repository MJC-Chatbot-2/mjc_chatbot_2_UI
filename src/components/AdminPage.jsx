import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

const MODE_LABELS = {
  all: '전체',
  max: '최대',
  avg: '평균',
};

const createEmptyStats = () => ({
  total: 0,
  max: 0,
  avg: 0,
});

const computeStats = (data, key) => {
  const values = data.map((d) => d[key] || 0);
  const total = values.reduce((sum, value) => sum + value, 0);
  const max = values.length ? Math.max(...values) : 0;
  const avg = values.length ? Math.round(total / values.length) : 0;
  return { total, max, avg };
};

const getValueByMode = (stats, mode) => {
  if (!stats) return 0;
  if (mode === 'max') return stats.max || 0;
  if (mode === 'avg') return stats.avg || 0;
  return stats.total || 0;
};

const getModeCaption = (mode, defaultCaption) => {
  if (mode === 'max') return '선택 기간 내 최대값';
  if (mode === 'avg') return '선택 기간 내 평균값';
  return defaultCaption;
};

const getUnitLabel = (mode) =>
  mode === 'avg' ? 'tokens / 구간' : 'tokens';

const AdminPage = () => {
  const navigate = useNavigate();

  const [timeframe, setTimeframe] = useState('daily'); // daily | weekly | monthly | yearly
  const [viewMode, setViewMode] = useState('all'); // all | department | student | staff
  const [chartData, setChartData] = useState([]);
  const [totalMode, setTotalMode] = useState('all');
  const [requestMode, setRequestMode] = useState('all');
  const [responseMode, setResponseMode] = useState('all');
  const [summary, setSummary] = useState({
    tokens: createEmptyStats(),
    requestTokens: createEmptyStats(),
    responseTokens: createEmptyStats(),
    periodLabel: '',
  });
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔧 백엔드 포트 맞게 수정
        const API_BASE = 'http://localhost:8000';
        const url = `${API_BASE}/api/admin/token-usage?period=${timeframe}`;

        console.log('호출 URL:', url);

        const res = await fetch(url);

        console.log('status:', res.status, res.statusText, 'content-type:', res.headers.get('content-type'));

        if (!res.ok) {
          // HTML 에러 본문을 찍어보자
          const text = await res.text();
          console.error('응답 본문(에러):', text);
          throw new Error(`API error: ${res.status}`);
        }

        const json = await res.json();
        console.log('응답 JSON:', json);

        const items = json.items || [];

        const mapped = items.map((item) => ({
          label: item.period,
          tokens: item.total_tokens || 0,
          requestTokens: item.request_tokens || 0,
          responseTokens: item.response_tokens || 0,
        }));

        let periodLabel = '';
        if (timeframe === 'daily') periodLabel = '일별 사용량 기준';
        if (timeframe === 'weekly') periodLabel = '주별 사용량 기준';
        if (timeframe === 'monthly') periodLabel = '월별 사용량 기준';
        if (timeframe === 'yearly') periodLabel = '연도별 사용량 기준';

        const tokenStats = computeStats(mapped, 'tokens');
        const requestStats = computeStats(mapped, 'requestTokens');
        const responseStats = computeStats(mapped, 'responseTokens');

        setChartData(mapped);
        setSummary({
          tokens: tokenStats,
          requestTokens: requestStats,
          responseTokens: responseStats,
          periodLabel,
        });
      } catch (err) {
        console.error('토큰 사용량 조회 실패:', err);
        setChartData([]);
        setSummary({
          tokens: createEmptyStats(),
          requestTokens: createEmptyStats(),
          responseTokens: createEmptyStats(),
          periodLabel: '데이터를 불러오지 못했습니다.',
        });
      }
    };

    fetchData();
  }, [timeframe, viewMode]);


  const formatNumber = (num = 0) =>
    Number(num || 0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

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
          <div className="metric-card-header">
            <h3>전체 토큰 사용량</h3>
            <div className="metric-toggle">
              {['all', 'max', 'avg'].map((mode) => (
                <button
                  key={mode}
                  className={`chip ${totalMode === mode ? 'chip-active' : ''}`}
                  onClick={() => setTotalMode(mode)}
                >
                  {MODE_LABELS[mode]}
                </button>
              ))}
            </div>
          </div>
          <p className="metric-value">
            {formatNumber(getValueByMode(summary.tokens, totalMode))}
            <span className="metric-unit">{getUnitLabel(totalMode)}</span>
          </p>
          <p className="metric-caption">
            {getModeCaption(totalMode, summary.periodLabel)}
          </p>
        </div>

        <div className="metric-card">
          <div className="metric-card-header">
            <h3>요청 토큰량</h3>
            <div className="metric-toggle">
              {['all', 'max', 'avg'].map((mode) => (
                <button
                  key={mode}
                  className={`chip ${requestMode === mode ? 'chip-active' : ''}`}
                  onClick={() => setRequestMode(mode)}
                >
                  {MODE_LABELS[mode]}
                </button>
              ))}
            </div>
          </div>
          <p className="metric-value">
            {formatNumber(getValueByMode(summary.requestTokens, requestMode))}
            <span className="metric-unit">{getUnitLabel(requestMode)}</span>
          </p>
          <p className="metric-caption">
            {getModeCaption(requestMode, summary.periodLabel)}
          </p>
        </div>

        <div className="metric-card">
          <div className="metric-card-header">
            <h3>응답 토큰량</h3>
            <div className="metric-toggle">
              {['all', 'max', 'avg'].map((mode) => (
                <button
                  key={mode}
                  className={`chip ${responseMode === mode ? 'chip-active' : ''}`}
                  onClick={() => setResponseMode(mode)}
                >
                  {MODE_LABELS[mode]}
                </button>
              ))}
            </div>
          </div>
          <p className="metric-value">
            {formatNumber(getValueByMode(summary.responseTokens, responseMode))}
            <span className="metric-unit">{getUnitLabel(responseMode)}</span>
          </p>
          <p className="metric-caption">
            {getModeCaption(responseMode, summary.periodLabel)}
          </p>
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
              const maxTokenValue = summary.tokens.max || 0;
              const ratio =
                maxTokenValue > 0 ? (item.tokens / maxTokenValue) * 100 : 0;
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
