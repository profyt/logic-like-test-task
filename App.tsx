/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import {
  SafeAreaProvider,
  SafeAreaView
} from 'react-native-safe-area-context'
import { CourseItem } from './src/components/CourseItem'
import { TagSelector } from './src/components/TagSelector'
import { theme } from './src/theme'
import { Course } from './src/types'

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeTag, setActiveTag] = useState<Course['tags'][number] | null>(null);
  const [hasFetchError, setFetchError] = useState(false);
  const listRef = useRef<FlatList<Course>>(null)

  useEffect(() => {
    fetch('https://logiclike.com/docs/courses.json')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(() => setFetchError(true))
  }, [])

  const coursesList = useMemo(() => {
    if (activeTag) {
      return courses.filter(course => course.tags.includes(activeTag))
    }
    return courses
  }, [activeTag, courses])

  const tagList = useMemo(() => {
    const list = new Set<Course['tags'][number]>()
    courses.forEach((course) => course.tags.forEach(tag => list.add(tag)))
    return [null, ...list]
  }, [courses])

  useEffect(() => {
    if(listRef.current?.props.data && listRef.current?.props.data?.length > 0 ){
      listRef.current?.scrollToIndex({index: 0})
    }
  }, [activeTag])

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.page}>
          <TagSelector 
            activeTag={activeTag}
            tagList={tagList}
            onChangeTag={(tag) => setActiveTag(tag)}
          />
          {hasFetchError 
            ? <Text style={styles.error}>Ошибка загрузки данных</Text> 
            : <FlatList
                ref={listRef}
                contentContainerStyle={styles.itemsContainer} 
                data={coursesList} 
                renderItem={(course) => <CourseItem key={course.item.id} course={course.item} />}
                keyExtractor={course => course.id}
                getItemLayout={(data, index) => (
                  {length: 210, offset: 228 * index, index}
                )}
                horizontal 
                showsHorizontalScrollIndicator={false}
              />
          }
          
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.mainBg,
  },
  page: {
    height: '100%',
    rowGap: 38,
    paddingTop: 12
  },
  itemsContainer: {
    paddingHorizontal: 24,
    gap: 18
  },
  error: {
    fontFamily: theme.fontFamily,
    color: theme.textColor.inverted
  }
});

export default App;
