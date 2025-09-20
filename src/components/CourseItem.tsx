import { memo } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { theme } from "../theme"
import { Course } from "../types"

export const CourseItem = memo(({course}: {course: Course}) => {
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <View style={{...styles.imageWrap, backgroundColor: course.bgColor}}>
                    <Image src={course.image} width={144} height={144}/>
                </View>
                <Text style={styles.title}>{course.name}</Text>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        width: 210,
        height: 204,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: theme.shadow
    },

    item: {
        width: 210,
        height: 198,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: '#fff'
    },
    imageWrap: {
        width: '100%',
        height: 162,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 14,
        color: theme.textColor.primary,
        textAlign: 'center',
        margin: 'auto',
        fontFamily: 'Nunito-Black'
    }
  });