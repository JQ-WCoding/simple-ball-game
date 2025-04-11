document.addEventListener('DOMContentLoaded', () => {
    const ball = document.getElementById('ball');
    let isMouseDown = false;
    let animationId = null;
    let velocity = 0;
    let gravity = 0.5;
    let position = 80; // 초기 위치 (ground에서 80px 위)
    
    // 마우스 누를 때 공이 올라가도록
    document.addEventListener('mousedown', () => {
        isMouseDown = true;
        cancelAnimationFrame(animationId);
        moveBallUp();
    });
    
    // 마우스 놓으면 공이 떨어지도록
    document.addEventListener('mouseup', () => {
        isMouseDown = false;
        cancelAnimationFrame(animationId);
        dropBall();
    });
    
    // 터치 기기를 위한 이벤트 
    document.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isMouseDown = true;
        cancelAnimationFrame(animationId);
        moveBallUp();
    });
    
    document.addEventListener('touchend', (e) => {
        e.preventDefault();
        isMouseDown = false;
        cancelAnimationFrame(animationId);
        dropBall();
    });
    
    // 공 올리기 함수
    function moveBallUp() {
        position += 3; // 위로 올라가는 속도
        
        // 최대 높이 제한 (화면 밖으로 나가지 않게)
        if (position > 350) {
            position = 350;
        }
        
        ball.style.bottom = position + 'px';
        
        if (isMouseDown) {
            animationId = requestAnimationFrame(moveBallUp);
        }
    }
    
    // 공 떨어뜨리기 함수
    function dropBall() {
        velocity += gravity; // 중력 적용
        position -= velocity; // 속도만큼 위치 감소
        
        // 바닥에 닿으면 튕기기
        if (position < 80) {
            position = 80;
            velocity = -velocity * 0.7; // 바운스 효과 (속도 반전 및 감소)
            
            // 아주 작은 속도는 정지시키기
            if (Math.abs(velocity) < 0.5) {
                velocity = 0;
                return;
            }
        }
        
        ball.style.bottom = position + 'px';
        
        if (!isMouseDown) {
            animationId = requestAnimationFrame(dropBall);
        }
    }
});