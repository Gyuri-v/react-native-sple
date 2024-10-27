import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
  },
  contents: {
    paddingVertical: 24,
    rowGap: 12,
  },
  box: {
    paddingVertical: 16,
  },

  /* navi */
  navi: {
    icon: {
      fontSize: 30,
    }
  },  

  /* header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: '100%',
    height: 60,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,

    /* text */
    text: {
      fontSize: 20,
      fontWeight: 700,
    }
  },

  subTitle: {
    fontSize: 20,
    fontWeight: 700,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});
