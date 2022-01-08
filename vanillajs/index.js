/* eslint-disable no-unused-vars */

// 1. 진입 시 input focus 구현
const $idInput = document.getElementById('idInput')
window.addEventListener('load', $idInput.focus())

// 2. 이메일 validation 로직 구현

// 유효하지 않을 경우, 에러 메세지가 나타나야 함
// 2-1. 비어있을 경우: "필수 정보입니다"
// 2-2. 패턴에 맞지 않을 경우: "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다."

const $idMsg = document.getElementById('idMsg')

const ID_INPUT_MESSAGE = {
    invalid: '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
    required: '필수 정보입니다.',
}

const ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')

const isValidId = (value) => {
    if (value.length === 0) {
        return 'required'
    } else {
        return ID_REGEX.test(value) ? true : 'invalid'
    }
}

const checkIdValidation = (value) => {
    const validationResult = isValidId(value)
    if (validationResult === true) {
        $idMsg.innerText = ''
        $idInput.classList.remove('border-red-600')
    } else {
        $idMsg.innerText = ID_INPUT_MESSAGE[validationResult]
        $idInput.classList.add('border-red-600')
    }
    return validationResult
}

$idInput.addEventListener('focusout', (e) => checkIdValidation(e.target.value))

// 3. 비밀번호 validation 로직 구현

// 유효하지 않을 경우, 아래 에러 메세지가 나타나야 함
// 3-1. 비어있을 경우: "필수 정보입니다"
// 3-2. 패턴에 맞지 않을 경우: "8~16자 영문 대 소문자, 숫자만 사용 가능합니다."

const $pwInput = document.getElementById('pwInput')
const $pwMsg = document.getElementById('pwMsg')

const isValidPw = (value) => {
    if (value.length === 0) {
        return 'required'
    } else {
        return PW_REGEX.test(value) ? true : 'invalid'
    }
}

const checkPwValidation = (value) => {
    const validationResult = isValidPw(value)
    if (validationResult === true) {
        $pwMsg.innerText = ''
        $pwInput.classList.remove('border-red-600')
    } else {
        $pwMsg.innerText = PW_INPUT_MESSAGE[validationResult]
        $pwInput.classList.add('border-red-600')
    }
    return validationResult
}

$pwInput.addEventListener('focusout', (e) => {
    checkPwValidation(e.target.value)
})

const PW_REGEX = new RegExp('^[a-zA-Z0-9W]{8,16}$')

const PW_INPUT_MESSAGE = {
    invalid: '8~16자 영문 대 소문자, 숫자만 사용 가능합니다.',
    required: '필수 정보입니다.',
}

// 4. 비밀번호 확인

// 4-1. 비어있을 경우: "필수 정보입니다"
// 4-2. 비밀번호와 일치하지 않을 경우: "비밀번호가 일치하지 않습니다."

const $pwCheckInput = document.getElementById('pwCheckInput')
const $pwCheckMsg = document.getElementById('pwCheckMsg')

const PW_CHECK_INPUT_MESSAGE = {
    invalid: '비밀번호가 일치하지 않습니다.',
    required: '필수 정보입니다.',
}

const isValidPwCheck = (value) => {
    if (value.length === 0) {
        return 'required'
    } else {
        return value === $pwInput.value ? true : 'invalid'
    }
}

const checkPwCheckValidation = (value) => {
    const validationResult = isValidPwCheck(value)
    if (validationResult === true) {
        $pwCheckMsg.innerText = ''
        $pwCheckInput.classList.remove('border-red-600')
    } else {
        $pwCheckMsg.innerText = PW_CHECK_INPUT_MESSAGE[validationResult]
        $pwCheckInput.classList.add('border-red-600')
    }
    return validationResult
}

$pwCheckInput.addEventListener('focusout', (e) => {
    checkPwCheckValidation(e.target.value)
})

// 5. 제출하기 버튼

const $form = document.getElementById('form')
$form.addEventListener('submit', (e) => onSubmit(e))

// 6. 입력 확인 모달
const $submitModal = document.getElementById('submitModal')
const $submitInput = document.getElementById('submitInput')
const $confirmId = document.getElementById('confirmId')
const $confirmPw = document.getElementById('confirmPw')

const $cancleSubmitModal = document.getElementById('cancleSubmitModal')
const $approveSubmitModal = document.getElementById('approveSubmitModal')

const onSubmit = (e) => {
    e.preventDefault()
    const isValidForm =
        checkIdValidation($idInput.value) === true &&
        checkPwValidation($pwInput.value) === true &&
        checkPwCheckValidation($pwCheckInput.value) === true
    if (isValidForm) {
        $submitModal.hidden = false
        $confirmId.innerText = $idInput.value
        $confirmPw.innerText = $pwInput.value
    }
}

const disableSubmit = () => ($submitInput.disabled = true)
const enableSubmit = () => ($submitInput.disabled = false)

$cancleSubmitModal.addEventListener('click', () => ($submitModal.hidden = true))
$approveSubmitModal.addEventListener('click', () =>
    window.alert('가입되었습니다 🥳')
)

// 7. 폰트 사이즈 조절 기능

const $html = document.documentElement

const $increaseFontBtn = document.getElementById('increaseFontBtn')
$increaseFontBtn.addEventListener('click', () =>
    onClickFontSizeControl('increase')
)

const $decreaseFontBtn = document.getElementById('decreaseFontBtn')
$decreaseFontBtn.addEventListener('click', () =>
    onClickFontSizeControl('decrease')
)

const MAX_FONT_SIZE = 20
const MIN_FONT_SIZE = 12

const getBodyFontSize = () => {
    const bodyFontSize = window
        .getComputedStyle($html, null)
        .getPropertyValue('font-size')

    return parseFloat(bodyFontSize)
}

const onClickFontSizeControl = (flag) => {
    const fontSize = getBodyFontSize()
    let newFontSize = fontSize
    if (flag === 'increase' && !$increaseFontBtn.disabled) {
        $html.style.fontSize = fontSize + 1 + 'px'
        newFontSize += 1
    }
    if (flag === 'decrease' && !$decreaseFontBtn.disabled) {
        $html.style.fontSize = fontSize - 1 + 'px'
        newFontSize -= 1
    }
    $decreaseFontBtn.disabled = newFontSize <= MIN_FONT_SIZE
    $increaseFontBtn.disabled = newFontSize >= MAX_FONT_SIZE
}
