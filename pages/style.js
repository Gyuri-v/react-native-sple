import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
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
    marginTop: 80,
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
    fontSize: 24,
    marginVertical: 16,
  },

  /* contents */
  contents: {
    paddingHorizontal: 8,
    paddingVertical: 22,
  },

  /* user */
  user: {
    flexDirection: 'row',
    alignItems: 'center',

    image: {
      alignItems: "center",
      justifyContent: 'center',
      marginRight: '5%',
      width: 50,
      height: 50,
      backgroundColor: '#ddd',
      borderRadius: '50%',
      text: {
        fontSize: 30,
      },
    },
    info: {
      width: '75%',
      name: {
        fontSize: 20,
        fontWeight: 600,
      },
      text: {
        fontSize: 14,
        fontWeight: 400,
      }
    },
  },



  /* todo */
  btnText: {
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: '#222',
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
