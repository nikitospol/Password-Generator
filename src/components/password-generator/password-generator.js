import React from "react"

import { Input } from "../../ui/input"
import { Select } from "../../ui/select"
import { Checkbox } from "../../ui/checkbox"
import { Button } from "../../ui/button"

import styles from './password-generator.module.css'

function PasswordGenerator () {
	let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDFGHIJKLMNOPQRSTUVWXYZ'
	const passwordLenghtValues = [12, 13, 14, 15, 16]
	const symbols = '!@#$%^&()_+?:{}[]'

	const [result, setResult] = React.useState('')
	const [passwordLenght, setPasswordLenght] = React.useState(passwordLenghtValues[0])
	const [isSimbolsUse, setIsSimbolsUse] = React.useState(false)
	const [isPasswordCopied, setIsPasswordCopied] = React.useState(false)

	function handlePasswordGenerator () {
		let currentResult = ''

		if (isSimbolsUse){
			chars += symbols
		}

		for (let i = 0; i < passwordLenght; i += 1) {
			const rundomNumber = Math.floor(Math.random() * chars.length)
			currentResult += chars.substring(rundomNumber, rundomNumber + 1)
		}
		setResult(currentResult)
	}

	function handleBlur (event) {
		setPasswordLenght(event.target.value)
	}

	function hendleSymbolsUse () {
		setIsSimbolsUse(!isSimbolsUse)
	}

	function handlePasswordCopy () {
		if (result) {
			let timerId = null
			navigator.clipboard.writeText(result).then(() => {
				setIsPasswordCopied(true)
				timerId = setTimeout(() => {
					setIsPasswordCopied(false)
					clearTimeout(timerId)
				}, 1000)
			})
		}
	}

	return (
		<div className={styles['root']}>
			<h1 className={styles['title']}>Password Generator</h1>
			<div className={styles['result']}>
				<Input type="text" readOnly={true} defaultValue={result}/>
				<button className={styles['copy']} onClick={handlePasswordCopy}></button>
				{isPasswordCopied && <span className={styles['copied']}>Copied</span>}
			</div>
			<div className={styles['option']}>
				<span className={styles['option-name']}>Password length</span>
				<Select options={passwordLenghtValues} onBlur={handleBlur}></Select>
			</div>
			<div className={styles['option']}>
				<label className={styles['option-label']} htmlFor='symbols'>Use special symbols</label>
				<Checkbox defaultChecked={false} id='symbols' onChange={hendleSymbolsUse}></Checkbox>
			</div>
			<Button type="button" onClick={handlePasswordGenerator}>Generate password</Button>
		</div>
	)
}
export {PasswordGenerator}