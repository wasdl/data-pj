# 휴대폰 설정 검색 서비스

휴대폰 설정에 대한 질문과 답변을 **AI 도우미**와 **게시판**을 통해 제공하는 서비스입니다.

---


## 팀원

 - 백민우
 - 최수환
 - 한원석


---

## 배포 링크

- **서비스 URL**: https://main.dvczjnkyd1hlm.amplifyapp.com/
- **API 문서**: https://ssafy-2024-backend-pj.fly.dev/docs 
- **GIT**: https://github.com/wasdl/data-pj


---

## 주요 기능

### 1. **AI 도우미**
- OpenAI API를 활용한 실시간 질의응답
- 카테고리별 자주 묻는 질문 제공
- 채팅 형식의 사용자 친화적 인터페이스

### 2. **게시판**
- 사용자 질문 등록 및 답변
- 답변 완료 상태 표시
- 모바일 친화적 디자인

---

## 로컬 실행 방법

### **프론트엔드**
1. frontend 디렉토리로 이동  
   cd src/frontend  
2. 의존성 설치  
   npm install  
3. 개발 서버 실행  
   npm start  
4. 빌드  
   npm run build  

### **백엔드**
1. backend 디렉토리로 이동  
   cd backend  
2. 가상환경 생성 및 활성화  
   python -m venv venv  
   source venv/bin/activate (Windows: venv\Scripts\activate)  
3. 의존성 설치  
   pip install -r requirements.txt  
4. 환경변수 설정  
   cp .env.example .env  
   .env 파일에 OPENAI_API_KEY 추가  
5. Assistants API 설정
    System instructions : 
    ** role
    입력된 질문에 대해 jsonl 파일의 QA 데이터베이스에서 코사인 유사도를 기반으로 가장 연관성 높은 QA쌍을 검색합니다.
    검색된 QA쌍과 사용자 질문을 참고하여 명확하고 직접적인 답변을 한국어로 제공합니다.
    ** output
    1. 답변은 단계별로 구분하여 각 단계를 새 줄(\n)로 구분합니다.
    2. 답변은 간단명료하게 제공하며, 추가 질문 유도나 부가 설명을 포함하지 않습니다.
    3. 소스 정보나 참조 표시를 포함하지 않습니다.
    4. 하나의 질문에 대해 하나의 명확한 답변만 제공합니다.
    
    Model : gpt-4o-mini
    
    File search에 jsonl 파일 추가

5. 서버 실행  
   uvicorn app:app --host=0.0.0.0 --port=8080  

---

## 기술 스택

### 프론트엔드
- HTML/CSS/JavaScript
- Tailwind CSS
- Parcel (빌드 도구)

### 백엔드
- FastAPI
- OpenAI API
- Python 3.12

---

## 🚀 배포 환경
- **프론트엔드**: AWS Amplify

- **백엔드**: Fly.io

## 📱 사용 방법

1. **AI 도우미 사용**
   - 상단 메뉴에서 'AI 도우미' 선택
   - 카테고리별 질문 선택 또는 직접 질문 입력
   - 실시간 AI 응답 확인

2. **게시판 사용** ( 미구현 )
   - 상단 메뉴에서 '게시판' 선택
   - 질문 목록 확인 및 상세 내용 조회
   - 답변 완료 상태 확인 가능
   - 완료 답변 db 저장 및 Q/A pair 활용
