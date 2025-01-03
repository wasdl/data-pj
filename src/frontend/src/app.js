const chatContainer = document.getElementById("chat-container");
const messageForm = document.getElementById("message-form");
const userInput = document.getElementById("user-input");
const mainContent = document.getElementById("main-content");

// 모든 버튼에 적용될 심플한 스타일
const commonButtonStyles = [
  "text-left",
  "px-4",
  "py-2",
  "text-base",
  "bg-gray-50",
  "border",
  "border-gray-200",
  "rounded-lg",
  "w-full",
  "min-h-[36px]",
  "text-gray-700",
  "hover:bg-gray-100",
  "hover:border-gray-300",
  "transition-colors",
  "duration-200"
];

// AI 도우미로 전환하는 함수
function showAIHelper(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    // 채팅 컨테이너 표시
    chatContainer.style.display = 'block';
    
    // 메시지 폼 표시
    messageForm.parentElement.style.display = 'block';
    
    // 기존 게시판 내용 제거
    mainContent.innerHTML = '';
    mainContent.appendChild(chatContainer);

    // 초기 메시지와 메뉴 다시 생성
    chatContainer.innerHTML = ''; // 기존 채팅 내용 초기화
    
    const welcomeWrapper = document.createElement("div");
    welcomeWrapper.classList.add(
        "mb-4", 
        "flex", 
        "flex-row",
        "animate-fade-in"
    );

    // Assistant 아바타
    const avatar = document.createElement("div");
    avatar.classList.add(
        "w-8",
        "h-8",
        "rounded-full",
        "flex-shrink-0",
        "flex",
        "items-center",
        "justify-center",
        "mx-3",
        "shadow-md",
        "bg-yellow-400"
    );
    
    avatar.innerHTML = `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="white">
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
    </svg>`;

    const messageContainer = document.createElement("div");
    messageContainer.classList.add(
        "flex",
        "flex-col",
        "items-start",
        "max-w-[70%]"
    );

    const welcomeBubble = document.createElement("div");
    welcomeBubble.classList.add(
        "p-4",
        "rounded-2xl",
        "rounded-tl-none",
        "bg-white",
        "text-gray-800",
        "shadow-md",
        "border",
        "border-gray-100",
        "text-base",
        "whitespace-pre-wrap",
        "leading-relaxed"
    );
    welcomeBubble.textContent = "안녕하세요! 휴대폰 설정에 대해 궁금한 점이 있으시다면 무엇이든 물어보세요.\n\n자주 묻는 질문 카테고리를 선택하시면 더 자세한 내용을 확인하실 수 있습니다:";

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add(
        "mt-3",
        "grid",
        "gap-1.5",
        "w-full"
    );

    // 카테고리 버튼 생성
    const categories = {
        "1. 일반 설정": generalSettings,
        "2. 네트워크 및 연결": networkSettings,
        "3. 보안 및 개인 정보": securitySettings,
        "4. 알림 및 소리": notificationSettings,
        "5. 저장 공간 및 파일 관리": storageSettings,
        "6. 소프트웨어 및 업데이트": softwareSettings,
        "7. 배터리 및 전원 관리": batterySettings,
        "8. 앱 관련 설정": appSettings,
        "9. 복구 및 초기화": recoverySettings
    };

    Object.entries(categories).forEach(([category, subItems]) => {
        const button = document.createElement("button");
        button.textContent = category;
        button.classList.add(...commonButtonStyles);
        button.addEventListener('click', () => showSubMenu(category, subItems));
        buttonContainer.appendChild(button);
    });

    welcomeBubble.appendChild(buttonContainer);
    messageContainer.appendChild(welcomeBubble);
    welcomeWrapper.appendChild(avatar);
    welcomeWrapper.appendChild(messageContainer);
    chatContainer.appendChild(welcomeWrapper);
}

// 전역 스코프에 함수 추가
window.showAIHelper = showAIHelper;

// 게시판으로 전환할 때 메시지 폼 숨기기
const originalShowBoard = window.showBoard;
window.showBoard = function(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    // 채팅 컨테이너 숨기기
    chatContainer.style.display = 'none';
    
    // 메시지 폼 숨기기
    messageForm.parentElement.style.display = 'none';
    
    // 기존 showBoard 함수 호출
    originalShowBoard(event);
};

// 초기 메시지와 메뉴 생성
window.addEventListener('DOMContentLoaded', () => {
  const welcomeWrapper = document.createElement("div");
  welcomeWrapper.classList.add(
    "mb-4", 
    "flex", 
    "flex-row",
    "animate-fade-in"
  );

  // Assistant 아바타
  const avatar = document.createElement("div");
  avatar.classList.add(
    "w-8",
    "h-8",
    "rounded-full",
    "flex-shrink-0",
    "flex",
    "items-center",
    "justify-center",
    "mx-3",
    "shadow-md",
    "bg-yellow-400"
  );
  
  avatar.innerHTML = `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="white">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
  </svg>`;

  const messageContainer = document.createElement("div");
  messageContainer.classList.add(
    "flex",
    "flex-col",
    "items-start",
    "max-w-[70%]"
  );

  const welcomeBubble = document.createElement("div");
  welcomeBubble.classList.add(
    "p-4",
    "rounded-2xl",
    "rounded-tl-none",
    "bg-white",
    "text-gray-800",
    "shadow-md",
    "border",
    "border-gray-100",
    "text-base",
    "whitespace-pre-wrap",
    "leading-relaxed"
  );
  welcomeBubble.textContent = "안녕하세요! 휴대폰 설정에 대해 궁금한 점이 있으시다면 무엇이든 물어보세요.\n\n자주 묻는 질문 카테고리를 선택하시면 더 자세한 내용을 확인하실 수 있습니다:";

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add(
    "mt-3",
    "grid",
    "gap-1.5",
    "w-full"
  );

  // 카테고리 버튼 생성
  const categories = {
    "1. 일반 설정": generalSettings,
    "2. 네트워크 및 연결": networkSettings,
    "3. 보안 및 개인 정보": securitySettings,
    "4. 알림 및 소리": notificationSettings,
    "5. 저장 공간 및 파일 관리": storageSettings,
    "6. 소프트웨어 및 업데이트": softwareSettings,
    "7. 배터리 및 전원 관리": batterySettings,
    "8. 앱 관련 설정": appSettings,
    "9. 복구 및 초기화": recoverySettings
  };

  Object.entries(categories).forEach(([category, subItems]) => {
    const button = document.createElement("button");
    button.textContent = category;
    button.classList.add(...commonButtonStyles);
    button.addEventListener('click', () => showSubMenu(category, subItems));
    buttonContainer.appendChild(button);
  });

  welcomeBubble.appendChild(buttonContainer);
  messageContainer.appendChild(welcomeBubble);
  welcomeWrapper.appendChild(avatar);
  welcomeWrapper.appendChild(messageContainer);
  chatContainer.appendChild(welcomeWrapper);
});

// 서브메뉴 표시 함수
function showSubMenu(category, items) {
  const wrapper = document.createElement("div");
  wrapper.classList.add(
    "mb-4", 
    "flex", 
    "flex-row",
    "animate-fade-in"
  );

  // Assistant 아바타
  const avatar = document.createElement("div");
  avatar.classList.add(
    "w-8",
    "h-8",
    "rounded-full",
    "flex-shrink-0",
    "flex",
    "items-center",
    "justify-center",
    "mx-3",
    "shadow-md",
    "bg-yellow-400"
  );
  
  avatar.innerHTML = `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="white">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
  </svg>`;

  const messageContainer = document.createElement("div");
  messageContainer.classList.add(
    "flex",
    "flex-col",
    "items-start",
    "max-w-[70%]"
  );

  const bubble = document.createElement("div");
  bubble.classList.add(
    "p-4",
    "rounded-2xl",
    "rounded-tl-none",
    "bg-white",
    "text-gray-800",
    "shadow-md",
    "border",
    "border-gray-100",
    "text-base",
    "whitespace-pre-wrap",
    "leading-relaxed"
  );

  bubble.textContent = `${category}에 대한 세부 질문을 선택해주세요:`;

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add(
    "mt-3",
    "grid",
    "gap-1.5",
    "w-full"
  );

  items.forEach(item => {
    const button = document.createElement("button");
    button.textContent = item;
    button.classList.add(...commonButtonStyles);
    
    button.addEventListener('click', () => {
      userInput.value = item;
      messageForm.dispatchEvent(new Event('submit'));
    });
    buttonContainer.appendChild(button);
  });

  bubble.appendChild(buttonContainer);
  messageContainer.appendChild(bubble);
  wrapper.appendChild(avatar);
  wrapper.appendChild(messageContainer);
  chatContainer.appendChild(wrapper);
  scrollToBottom();
}

// 카테고리별 질문 목록
const generalSettings = [
  "시스템 언어와 키보드 언어를 다르게 설정할 수 있나요?",
  "언어 변경 후 일부 앱에서 언어가 바뀌지 않는 이유는 무엇인가요?",
  "자동 시간 설정이 잘못된 경우 수동으로 변경하는 방법은?",
  "화면 밝기를 시간대에 따라 자동으로 조정할 수 있나요?",
  "야간 모드에서 화면 색감을 따뜻하게 조정하는 방법은?"
];

const networkSettings = [
  "저장된 Wi-Fi 비밀번호를 확인하거나 삭제하려면 어떻게 하나요?",
  "공용 Wi-Fi 사용 시 안전하게 접속하는 방법은?",
  "모바일 데이터를 사용할 수 있는 앱을 제한하는 방법은?",
  "블루투스를 사용하여 파일을 공유하는 절차는 무엇인가요?",
  "네트워크 우선 순위를 설정하는 방법은?"
];

const securitySettings = [
  "화면 잠금 옵션 중 가장 안전한 방법은 무엇인가요?",
  "지문 등록이 잘 안 될 때 해결 방법은?",
  "특정 앱만 비밀번호로 보호하려면 어떻게 해야 하나요?",
  "앱 권한 요청을 허용하지 않아도 앱을 사용할 수 있나요?",
  "위치 추적 기능을 비활성화하려면?"
];

const notificationSettings = [
  "특정 시간대에만 알림을 받지 않으려면 어떻게 설정하나요?",
  "전화와 메시지 알림 소리를 다르게 설정할 수 있나요?",
  "헤드폰을 연결했을 때만 소리가 나도록 설정하려면?",
  "특정 알림 소리를 맞춤으로 설정하려면 어떻게 해야 하나요?",
  "앱별 알림 내용을 숨기려면?"
];

const storageSettings = [
  "시스템 저장 공간을 줄이는 방법은 무엇인가요?",
  "정크 파일을 정리하는 가장 빠른 방법은?",
  "SD 카드를 내부 저장소로 포맷하려면?",
  "중복 파일을 찾아 삭제할 수 있는 방법은?",
  "대용량 파일을 외부로 전송하려면?"
];

const softwareSettings = [
  "업데이트 알림을 끄는 방법은?",
  "업데이트를 중단하거나 롤백하려면 어떻게 해야 하나요?",
  "베타 소프트웨어 업데이트에 참여하려면?",
  "업데이트 중간에 배터리가 부족할 때 문제를 해결하는 방법은?",
  "소프트웨어 업데이트 후 특정 앱이 충돌할 때 대처 방법은?"
];

const batterySettings = [
  "배터리 절약 모드가 자동으로 켜지도록 설정하려면?",
  "배터리 사용량이 많은 앱을 확인하고 최적화하는 방법은?",
  "휴대폰 충전 속도를 느리게 하는 원인과 해결 방법은?",
  "비행기 모드가 배터리 절약에 미치는 영향은?",
  "배터리 소모가 심한 백그라운드 프로세스를 종료하려면?"
];

const appSettings = [
  "기본 앱을 초기 상태로 되돌리려면?",
  "자동으로 설치되는 앱을 차단하는 방법은?",
  "특정 앱의 백그라운드 실행을 제한하려면?",
  "앱 데이터를 삭제하지 않고 재설치하려면 어떻게 해야 하나요?",
  "앱 스토어 이외의 경로에서 앱을 설치하려면?"
];

const recoverySettings = [
  "공장 초기화 전 데이터를 안전하게 백업하는 방법은?",
  "초기화 후 데이터를 복구할 때 클라우드 서비스를 사용하는 방법은?",
  "공장 초기화가 실패할 경우 대처 방법은?",
  "초기화를 진행하지 않고 특정 설정만 복구하려면?",
  "중요한 데이터가 삭제된 후 복구 소프트웨어를 사용하는 방법은?"
];

function createMessageBubble(content, sender = "user") {
  const wrapper = document.createElement("div");
  wrapper.classList.add(
    "mb-4", 
    "flex", 
    sender === "assistant" ? "flex-row" : "flex-row-reverse",
    "animate-fade-in"
  );

  if (sender === "assistant") {
    const avatar = document.createElement("div");
    avatar.classList.add(
      "w-8",
      "h-8",
      "rounded-full",
      "flex-shrink-0",
      "flex",
      "items-center",
      "justify-center",
      "mx-3",
      "shadow-md",
      "bg-yellow-400",
      "hover:bg-yellow-500",
      "transition-colors",
      "duration-200"
    );
    
    avatar.innerHTML = `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="white">
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
    </svg>`;
    wrapper.appendChild(avatar);
  }

  const messageContainer = document.createElement("div");
  messageContainer.classList.add(
    "flex",
    "flex-col",
    sender === "assistant" ? "items-start" : "items-end",
    "max-w-[70%]"
  );

  const bubble = document.createElement("div");
  bubble.classList.add(
    "p-4",
    "rounded-2xl",
    "whitespace-pre-wrap",
    "leading-relaxed",
    "text-base",
    "shadow-md",
    "transition-all",
    "duration-200",
    "hover:shadow-lg"
  );

  if (sender === "assistant") {
    bubble.classList.add(
      "bg-white",
      "text-gray-800",
      "rounded-tl-none",
      "border",
      "border-gray-100"
    );
  } else {
    bubble.classList.add(
      "bg-yellow-400",
      "text-gray-800",
      "rounded-tr-none",
      "hover:bg-yellow-500"
    );
  }

  bubble.textContent = content;
  messageContainer.appendChild(bubble);
  wrapper.appendChild(messageContainer);
  
  return wrapper;
}

// Scroll to bottom
function scrollToBottom() {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Fetch assistant response
async function getAssistantResponse(userMessage) {
  const response = await fetch("https://ssafy-2024-backend-pj.fly.dev/assistant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userMessage }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return formatAssistantResponse(data.reply);
}

// 응답 텍스트 포맷팅
function formatAssistantResponse(text) {
  return text
    .replace(/\\n/g, '\n')
    .replace(/\*/g, '')
    .replace(/【[^】]+】/g, '')
    .replace(/\[\d+:\d+†source\]/g, '')
    .split('\n')
    .filter(line => line.trim() !== '')
    .join('\n\n');
}

// Handle form submission
messageForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  // User message
  chatContainer.appendChild(createMessageBubble(message, "user"));
  userInput.value = "";
  scrollToBottom();

  // Assistant response
  try {
    const response = await getAssistantResponse(message);
    chatContainer.appendChild(createMessageBubble(response, "assistant"));
    scrollToBottom();
  } catch (error) {
    console.error("Error fetching assistant response:", error);
    chatContainer.appendChild(
      createMessageBubble(
        "죄송합니다. 응답을 가져오는 중 오류가 발생했습니다.",
        "assistant"
      )
    );
    scrollToBottom();
  }
});
