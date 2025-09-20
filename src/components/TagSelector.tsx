import { memo, useCallback, useMemo, useState } from "react"
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import Chevron from '../assets/icons/chevron.svg'
import Cross from '../assets/icons/cross.svg'
import { theme } from "../theme"
import { Course } from "../types"

type Props<T = Course['tags'][number] | null> = {
    activeTag: T,
    onChangeTag: (val: T) => void,
    tagList: T[]
}

type ModalProps = Props & {
    visible: boolean
    onClose: () => void,
}

type ButtonProps = Pick<Props, 'activeTag' | 'onChangeTag'> & {
    name: Props['activeTag']
}

export const TagSelector = memo(({activeTag, onChangeTag, tagList}: Props) => {
    const [isVisibleModal, setModalVisibility] = useState(false)

    const onChangeHandler = useCallback((val: Props['activeTag']) => {
        onChangeTag(val)
        setModalVisibility(false)
    }, [onChangeTag])

    return (
        <View>
            <Pressable 
                style={styles.showListButtonContainer}
                onPress={() => setModalVisibility(!isVisibleModal)}>
                    <Text style={styles.showListButtonText}>
                        {getTagName(activeTag)}
                    </Text>
                    <View style={styles.showListButtonIcon}>
                        <Chevron />
                    </View>
            </Pressable>
            <TagListModal 
                onChangeTag={onChangeHandler} 
                tagList={tagList} 
                visible={isVisibleModal}
                activeTag={activeTag}
                onClose={() => setModalVisibility(false)}
            />
        </View>
    )
})

const TagListModal = memo(({onChangeTag, tagList, visible, activeTag, onClose}: ModalProps) => {

    const TagList = useMemo(() => tagList.map(tag => (
        <TagButton 
            key={tag}
            name={tag}
            activeTag={activeTag}
            onChangeTag={onChangeTag}
        />
    )), [tagList, activeTag, onChangeTag])

    return (
        <Modal visible={visible} animationType='slide'>
            <View style={styles.container}>
                <Pressable 
                    style={styles.closeButton}
                    onPress={onClose}
                >
                    <Cross />
                </Pressable>
                <Text style={styles.title}>Выбор темы</Text>
                <ScrollView>
                    {TagList}
                </ScrollView>
            </View>
        </Modal>
    )
})

const TagButton = memo(({name, activeTag, onChangeTag}: ButtonProps) => {
    return (
        <Pressable 
            onPress={() => onChangeTag(name)} 
            style={StyleSheet.compose(styles.tagButton, activeTag === name ? styles.tagButtonActive : undefined)}
        >
            <Text
                style={StyleSheet.compose(styles.tagButtonText, activeTag === name ? styles.tagButtonTextActive : undefined)}
            >
                {getTagName(name)}
            </Text>
        </Pressable>
    )
})

const getTagName = (name: ButtonProps['name']) => name || 'Все темы'

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    title: {
        fontSize: 18,
        paddingBottom: 18,
        color: theme.textColor.primary,
        width: '100%',
        textAlign: 'center',
        fontFamily: 'Nunito-ExtraBold'
    },
    closeButton: {
        position: 'absolute',
        right: 24,
        top: 24,
        width: 22,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:10,
    },
    tagButton: {
        paddingHorizontal: theme.button.padding.horizontal,
        paddingVertical: theme.button.padding.vertical,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: theme.button.borderColor,
        backgroundColor: theme.button.bg,
        color: theme.button.text.primary,
        marginBottom: 6,
    },
    tagButtonText: {
        fontSize: 18,
        color: theme.button.text.primary,
        fontFamily: 'Nunito-ExtraBold'
    },
    tagButtonActive: {
        backgroundColor: theme.button.activeBg,
        borderColor: theme.button.activeBg,
    },
    tagButtonTextActive: {
        color: theme.button.text.active
    },
    showListButtonContainer: {
        backgroundColor: 'rgba(0,0,0, .2)',
        padding: 5,
        paddingLeft: 10,
        margin: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 40,
    },
    showListButtonIcon: {
        backgroundColor: 'rgba(0,0,0, .2)',
        padding: 3,
        marginLeft: 3,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: 18,
        height: 18,
    },
    showListButtonText: {
        fontSize: 12,
        color: theme.button.text.active,
        fontFamily: 'Nunito-ExtraBold'
    }
});