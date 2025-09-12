export interface IndicatorsResponse {
	next_url?: string;
	request_id?: string;
	status?: string;
	results?: IndicatorsResult;
}

export interface IndicatorsResult {
	underlying: {
		aggregates: IndicatorsAggregates[];
		url: string;
	};
	values: {
		timestamp: number;
		value: number;
	}[];
}
/**
 * 개별 캔들(시세 데이터)의 집계 정보
 */
interface IndicatorsAggregates {
	/** 종가 (Close Price) */
	c: number;
	/** 고가 (High Price) */
	h: number;
	/** 저가 (Low Price) */
	l: number;
	/** 거래 건수 (Number of Transactions) */
	n: number;
	/** 시가 (Open Price) */
	o: number;
	/** 타임스탬프 (Unix 밀리초 단위) */
	t: number;
	/** 거래량 (Volume) */
	v: number;
	/** 거래량 가중 평균가 (Volume Weighted Average Price) */
	vw: number;
	/** OTC(장외거래) 여부 — true일 경우 장외거래 데이터 */
	otc?: boolean;
}

/**
 * 전체 뉴스 응답 객체
 */
export interface NewsResponse {
	count?: number;
	next_url?: string;
	request_id?: string;
	results?: NewsResult[];
	status?: string;
}
export interface NewsResult {
	/** AMP(모바일 최적화) 버전의 기사 URL */
	amp_url: string;
	/** 원본 뉴스 기사 URL */
	article_url: string;
	/** 기사 작성자 이름 */
	author: string;
	/** 기사 요약 또는 설명 */
	description: string;
	/** 고유한 기사 ID */
	id: string;
	/** 기사에 포함된 이미지 URL */
	image_url: string;
	/** 기사에 대한 감성 분석 정보 */
	insights: NewsArticleInsight[];
	/** 기사와 관련된 키워드 목록 */
	keywords: string[];
	/** 기사 발행 시간 (UTC, RFC3339 형식) */
	published_utc: string;
	/** 뉴스 출처 정보 */
	publisher: {
		favicon_url?: string;
		homepage_url: string;
		logo_url: string;
		name: string;
	};

	/** 기사와 관련된 주식 티커 목록 */
	tickers: string[];
	/** 뉴스 기사 제목 */
	title: string;
}
interface NewsArticleInsight {
	/** 기사에 대한 감성 평가 */
	sentiment: 'positive' | 'neutral' | 'negative';
	/** 감성 평가의 근거 설명 */
	sentiment_reasoning: string;
	/** 감성 분석이 적용된 특정 티커 */
	ticker: string;
}
