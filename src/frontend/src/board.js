// 게시글 데이터
const posts = [
    {
        id: 6,
        title: "위치 서비스 켜는 방법",
        content: "위치 서비스를 켜는 방법을 알려주세요.",
        answer: "위치 서비스를 켜려면 설정 > 개인정보 보호 > 위치 서비스에서 활성화할 수 있습니다.",
        date: "2024-03-20",
        completed: true
    },
    {
        id: 5,
        title: "데이터 절약 모드 설정",
        content: "데이터 사용량을 줄일 수 있는 방법이 있나요?",
        date: "2024-03-19",
        completed: false
    },
    {
        id: 4,
        title: "앱 알림 설정 변경하기",
        content: "특정 앱의 알림을 끄고 싶은데 어떻게 하나요?",
        answer: "앱별 알림 설정을 변경하려면 설정 > 알림에서 원하는 앱을 선택하여 알림 방식을 조정할 수 있습니다.",
        date: "2024-03-18",
        completed: true
    },
    {
        id: 3,
        title: "블루투스 연결 안됨",
        content: "블루투스 기기가 연결이 안되는데 어떻게 해결하나요?",
        date: "2024-03-17",
        completed: false
    },
    {
        id: 2,
        title: "배터리 최적화 설정 방법",
        content: "배터리가 너무 빨리 닳는데 최적화하는 방법이 있나요?",
        answer: "배터리 수명을 늘리려면 설정 > 배터리에서 배터리 절약 모드를 활성화하고, 앱별 배터리 사용량을 확인하여 최적화할 수 있습니다.",
        date: "2024-03-16",
        completed: true
    },
    {
        id: 1,
        title: "화면 밝기 자동 조절 기능 문의",
        content: "화면 밝기가 자동으로 조절되는 기능을 어떻게 설정하나요?",
        answer: "자동 밝기 조절은 설정 > 디스플레이에서 설정할 수 있습니다. 주변 밝기에 따라 화면 밝기가 자동으로 조절됩니다.",
        date: "2024-03-15",
        completed: true
    }
];

// 게시판 목록 보기
function showBoard(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const mainContent = document.getElementById('main-content');
    const chatContainer = document.getElementById('chat-container');
    const messageForm = document.getElementById('message-form');
    
    // 채팅 컨테이너와 입력 폼 숨기기
    if (chatContainer) {
        chatContainer.style.display = 'none';
    }
    if (messageForm) {
        messageForm.parentElement.style.display = 'none';
    }
    
    mainContent.innerHTML = `
        <div class="container mx-auto px-4 py-8">
            <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">문의 게시판</h2>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="border-b border-gray-200">
                                <th class="py-3 px-6 text-left">번호</th>
                                <th class="py-3 px-6 text-left">제목</th>
                                <th class="py-3 px-6 text-left">작성일</th>
                                <th class="py-3 px-6 text-center">완료</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${posts.map(post => `
                                <tr class="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150 cursor-pointer" onclick="showPost(${post.id})">
                                    <td class="py-4 px-6">${post.id}</td>
                                    <td class="py-4 px-6">${post.title}</td>
                                    <td class="py-4 px-6">${post.date}</td>
                                    <td class="py-4 px-6 text-center">
                                        ${post.completed ? 
                                            `<span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
                                                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                                </svg>
                                            </span>` : 
                                            `<span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100">
                                                <span class="w-2 h-2 rounded-full bg-gray-400"></span>
                                            </span>`
                                        }
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// 게시글 상세 보기
function showPost(id) {
    const post = posts.find(p => p.id === id);
    const mainContent = document.getElementById('main-content');
    
    mainContent.innerHTML = `
        <div class="container mx-auto px-4 py-8">
            <div class="bg-white rounded-lg shadow-md p-6">
                <!-- 게시글 헤더 -->
                <div class="mb-6">
                    <h1 class="text-2xl font-bold text-gray-800 mb-2">${post.title}</h1>
                    <div class="text-gray-600 text-sm">
                        작성일: ${post.date}
                    </div>
                </div>
                
                <!-- 게시글 내용 -->
                <div class="border-t border-gray-200 py-6">
                    <div class="bg-gray-50 p-6 rounded-lg">
                        <p class="text-gray-700">${post.content}</p>
                    </div>
                </div>

                <!-- 답변 섹션 -->
                <div class="mt-8">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">답변 ${post.completed ? '1' : '0'}</h3>
                    
                    ${post.completed ? `
                        <div class="pl-8 border-l-2 border-yellow-400">
                            <div class="bg-yellow-50 p-4 rounded-lg shadow-sm border border-yellow-100">
                                <div class="flex items-center justify-between mb-3">
                                    <div class="flex items-center space-x-2">
                                        <div class="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                                            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <span class="font-medium text-gray-800">관리자</span>
                                            <div class="flex items-center space-x-1 text-sm text-yellow-600">
                                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                                </svg>
                                                <span>채택된 답변</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span class="text-sm text-gray-500">${post.date}</span>
                                </div>
                                <p class="text-gray-700 pl-10">${post.answer}</p>
                            </div>
                        </div>
                    ` : `
                        <div class="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                            아직 답변이 없습니다.
                        </div>
                    `}
                    
                    <!-- 답변 작성 폼 -->
                    <div class="mt-6">
                        <div class="flex items-start space-x-4">
                            <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                <svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
                                </svg>
                            </div>
                            <div class="flex-1">
                                <textarea 
                                    class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition-colors duration-200 resize-none"
                                    rows="3"
                                    placeholder="답변을 작성해주세요..."
                                ></textarea>
                                <div class="mt-2 flex justify-end">
                                    <button class="px-4 py-2 bg-yellow-400 text-gray-800 rounded-lg hover:bg-yellow-500 transition-colors duration-200">
                                        답변 작성
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 목록으로 버튼 -->
                <div class="mt-8 pt-6 border-t border-gray-200">
                    <button onclick="showBoard()" 
                            class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-150">
                        목록으로
                    </button>
                </div>
            </div>
        </div>
    `;
}

// 전역 스코프에 함수들을 추가
window.showBoard = showBoard;
window.showPost = showPost; 