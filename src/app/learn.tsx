'use client'

import styles from './learn.module.css'

export function HelloWorld() {
    return (<>
        <h1>Hello, World!</h1>
        <p>Это мой первый компонент!</p>
    </>
    )
}

export function TaskList() {
    const data = ['Позавтракать', 'Почитать', 'Погулять', 'Поработать', 'Поужинать', 'Поспать']
    return (<>
        <ul>
            {data.map((item) => <li key={item}>{item}</li>)}
        </ul>
    </>)
}

export function ActionButton() {
    return (<>
        <button onClick={() => alert('Кнопка нажата!')}>Нажми меня!</button>
        <p>Кнопка пока не нажата</p>
    </>
    )
}

export function ProfileCard() {
    const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript']
    return (<>
        <h2>Анна Иванова</h2>
        <h3>Веб-разработчик</h3>
        <p>Люблю чёто там мне лень писать</p>
        <ul>
            {skills.map((skill) => <li key={skill}>{skill}</li>)}
        </ul>
    </>
    )
}

export function ImageGallery() {
    const images = [
        'https://placehold.co/600x400',
        'https://placehold.co/200x200',
        'https://placehold.co/250x250'
    ]
    return (<>
        <div className={styles.imageGallery}>
            {images.map((src) => <img key={src} className={styles.image} src={src} alt={src} />)}
        </div>
    </>
    )
}