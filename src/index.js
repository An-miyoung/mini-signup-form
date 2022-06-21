// TODO: 이 곳에 정답 코드를 작성해주세요.

// 페이지가 로드되는 시점에
// ID 입력 input tag 에 포커스

const $id = document.getElementById('id')
const $idMsg = document.getElementById('id-msg')
window.addEventListener('load', () => $id.focus())

const $pw = document.getElementById('pw')
const $pwMsg = document.getElementById('pw-msg')

const $pwCheck = document.getElementById('pw-check')
const $pwCheckMsg = document.getElementById('pw-check-msg')

const ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')
const PW_REGEX = new RegExp('^[a-zA-Z0-9]{8,16}$')

const ERROR_MESSAGE = {
    required: '필수 정보입니다.',
    inValidId: '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용가능합니다.',
    inValidPw: '8~16자의 영문 대 소문자, 숫자, 특수문자를 사용하세요.',
    inValidPwCheck: '비밀번호가 일치하지 않습니다.',
}

const clearErrorMsg = (target) => {
    target.innerText = ''
}

const checkRegEX = (target) => {
    const { value, id } = target
    if (value.length === 0) {
        return 'required'
    } else {
        switch (id) {
            case 'id':
                return ID_REGEX.test(value) ? true : 'inValidId'
            case 'pw':
                return PW_REGEX.test(value) ? true : 'inValidPw'
            case 'pw-check':
                return value === $pw.value ? true : 'inValidPwCheck'
        }
    }
}

const checkValidation = (target, msgTarget) => {
    const isValid = checkRegEX(target)
    if (isValid !== true) {
        target.classList.add('border-red-600')
        msgTarget.innerText = ERROR_MESSAGE[isValid]
    } else {
        target.classList.remove('border-red-600')
        msgTarget.innerText = ''
    }
    return isValid
}

$id.addEventListener('focusout', () => checkValidation($id, $idMsg))
$id.addEventListener('focus', () => clearErrorMsg($idMsg))
$id.addEventListener('click', () => clearErrorMsg($idMsg))

$pw.addEventListener('focusout', () => checkValidation($pw, $pwMsg))
$pw.addEventListener('focus', () => clearErrorMsg($pwMsg))
$pw.addEventListener('click', () => clearErrorMsg($pwMsg))

$pwCheck.addEventListener('focusout', () =>
    checkValidation($pwCheck, $pwCheckMsg)
)
$pwCheck.addEventListener('focus', () => clearErrorMsg($pwCheckMsg))
$pwCheck.addEventListener('click', () => clearErrorMsg($pwCheckMsg))

const $submit = document.getElementById('submit')
const $modal = document.getElementById('modal')
const $confirmId = document.getElementById('confirm-id')
const $confirmPw = document.getElementById('confirm-pw')
$submit.addEventListener('click', (e) => {
    e.preventDefault()
    const isValidForm =
        checkValidation($id, $idMsg) === true &&
        checkValidation($pw, $pwMsg) === true &&
        checkValidation($pwCheck, $pwCheckMsg) === true
    if (isValidForm) {
        $confirmId.innerText = $id.value
        $confirmPw.innerText = $pw.value
        $modal.showModal()
    }
})

const $cancelBtn = document.getElementById('cancel-btn')
const $approveBtn = document.getElementById('approve-btn')
$cancelBtn.addEventListener('click', () => {
    $modal.close()
})
$approveBtn.addEventListener('click', () => {
    $modal.close()
    window.alert('가입되었습니다 🥳 ')
    $id.innerText = ''
    $pw.innerText = ''
    $pwCheck.innerText = ''
})

const $increaseFontBtn = document.getElementById('increase-font-btn')
const $decreaseFontBtn = document.getElementById('decrease-font-btn')
const $html = document.documentElement

const MAX_FONT_SIZE = 20
const MIN_FONT_SIZE = 12

const getHtmlFontSize = () => {
    return parseFloat(window.getComputedStyle($html).fontSize)
}

const onClickFontSizeControl = (flag) => {
    const fontSize = getHtmlFontSize()
    let newFontSize = flag === 'increase' ? fontSize + 1 : fontSize - 1
    $html.style.fontSize = newFontSize
    $decreaseFontBtn.disabled = newFontSize <= MIN_FONT_SIZE
    $increaseFontBtn.disabled = newFontSize >= MAX_FONT_SIZE
}

$increaseFontBtn.addEventListener('click', () => {
    onClickFontSizeControl('increase')
})

$decreaseFontBtn.addEventListener('click', () => {
    onClickFontSizeControl('decrease')
})
