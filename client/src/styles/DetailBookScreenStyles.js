import { StyleSheet } from "react-native";
import Colors from "../constants/colors";
import Layout from "../constants/layout";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND
  },
  scrollView: {
    flex: 1
  },
  scrollViewContent: {
    paddingBottom: Layout.SPACING.XXL
  },
  bottomSpace: {
    height: 80,
    backgroundColor: Colors.WHITE,
    borderBottomRightRadius: Layout.BORDER_RADIUS.L,
    borderBottomLeftRadius: Layout.BORDER_RADIUS.L
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Layout.SPACING.L
  },
  errorText: {
    fontSize: Layout.FONT_SIZE.L,
    color: Colors.ERROR,
    textAlign: "center"
  },
  headerContainer: {
    flexDirection: "column"
  },
  imageContainer: {
    width: 115,
    height: 160,
    overflow: "hidden",
    backgroundColor: Colors.PLACEHOLDER,
    elevation: 3,
    shadowColor: Colors.TEXT_PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: Layout.BORDER_RADIUS.M,
    borderColor: Colors.PRIMARY,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    marginLeft: Layout.SPACING.L,
    marginBottom: Layout.SPACING.M,
    marginTop: "auto"
  },
  bookCover: {
    width: "100%",
    height: "100%",
    borderRadius: Layout.BORDER_RADIUS.S
  },
  noImageContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center"
  },
  noImageText: {
    fontSize: Layout.FONT_SIZE.XXL,
    fontWeight: Layout.FONT_WEIGHT.BOLD,
    color: Colors.WHITE
  },
  buttonContainer: {
    height: 16,
    width: 16,
    marginLeft: Layout.SPACING.L,
    marginTop: Layout.SPACING.S,
    marginBottom: Layout.SPACING.M
  },
  icon: {
    height: "100%",
    width: "100%"
  },
  headerInfo: {
    flexDirection: "row",
    height: 200
  },
  headerRight: {
    flexDirection: "column",
    justifyContent: "flex-end",
    marginLeft: Layout.SPACING.M
  },
  title: {
    fontFamily: "Roboto_900Black",
    fontSize: Layout.FONT_SIZE.XL,
    color: Colors.TEXT_PRIMARY,
    marginBottom: Layout.SPACING.XS
  },
  authors: {
    fontFamily: "Roboto_200ExtraLight",
    fontSize: Layout.FONT_SIZE.M,
    color: Colors.TEXT_PRIMARY,
    marginBottom: Layout.SPACING.XS
  },
  publishedDate: {
    fontFamily: "Roboto_200ExtraLight",
    fontSize: Layout.FONT_SIZE.S,
    color: Colors.TEXT_SECONDARY,
    marginBottom: Layout.SPACING.M
  },
  stars: {
    height: 20,
    width: 144,
    marginBottom: Layout.SPACING.S
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: Layout.SPACING.M
  },
  categoryBadge: {
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: Layout.SPACING.M,
    paddingVertical: Layout.SPACING.XS,
    borderRadius: Layout.BORDER_RADIUS.L,
    marginRight: Layout.SPACING.XS,
    marginBottom: Layout.SPACING.XS
  },
  categoryText: {
    fontSize: Layout.FONT_SIZE.XS,
    color: Colors.TEXT_PRIMARY
  },
  infoSection: {
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: Layout.BORDER_RADIUS.L,
    borderTopRightRadius: Layout.BORDER_RADIUS.L,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 120,
    alignItems: "center"
  },
  listButtonContainer: {
    height: 32,
    width: 32
  },
  listIcon: {
    height: "100%",
    width: "100%"
  },
  reviewstButtonContainer: {
    height: 32,
    width: 32
  },
  reviewsIcon: {
    height: "100%",
    width: "100%"
  },
  reviewContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 60,
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30
  },
  reviewButtonContainer: {
  },
  addReviewBtn: {
    backgroundColor: Colors.PRIMARY,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    height: 47,
    width: 150
  },
  reviewBtn: {
    backgroundColor: Colors.WHITE,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    height: 47,
    width: 150,
    borderColor: Colors.PRIMARY,
    borderWidth: 2
  },
  addReviewBtnText: {
    fontSize: 15,
    fontWeight: Layout.FONT_WEIGHT.BOLD,
    color: Colors.WHITE,
  },
  reviewBtnText: {
    fontSize: 15,
    fontWeight: Layout.FONT_WEIGHT.BOLD,
    color: Colors.PRIMARY,
  },
  reviewIcon: {
    height: "100%",
    width: "100%"
  },
  textSection: {
    marginTop: Layout.SPACING.XL,
    paddingHorizontal: Layout.SPACING.L
  },
  sectionTitle: {
    fontSize: Layout.FONT_SIZE.L,
    fontWeight: Layout.FONT_WEIGHT.BOLD,
    color: Colors.TEXT_PRIMARY,
    marginBottom: Layout.SPACING.M
  },
  detailsTitle: {
    fontSize: Layout.FONT_SIZE.L,
    fontWeight: Layout.FONT_WEIGHT.BOLD,
    color: Colors.TEXT_PRIMARY,
    marginBottom: Layout.SPACING.M,
    marginTop: Layout.SPACING.XL
  },
  description: {
    fontSize: Layout.FONT_SIZE.M,
    lineHeight: 20,
    color: Colors.TEXT_PRIMARY
  },
  noInfo: {
    fontSize: Layout.FONT_SIZE.M,
    color: Colors.TEXT_TERTIARY,
    fontStyle: "italic"
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: Layout.SPACING.S
  },
  detailLabel: {
    fontSize: Layout.FONT_SIZE.M,
    fontWeight: Layout.FONT_WEIGHT.BOLD,
    color: Colors.TEXT_PRIMARY,
    width: 80
  },
  detailValue: {
    fontSize: Layout.FONT_SIZE.M,
    color: Colors.TEXT_SECONDARY,
    flex: 1
  },
  floatingButton: {
    position: "absolute",
    bottom: Layout.SPACING.XL,
    right: Layout.SPACING.L,
    width: 56,
    height: 56,
    borderRadius: Layout.BORDER_RADIUS.ROUND,
    backgroundColor: Colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: Colors.TEXT_PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  floatingButtonText: {
    fontSize: Layout.FONT_SIZE.XXL,
    fontWeight: Layout.FONT_WEIGHT.BOLD,
    color: Colors.WHITE
  },
  titleContainer: {
    width: 230
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.OVERLAY
  },
  popup: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: Layout.SPACING.XL,
    padding: Layout.SPACING.L,
    borderRadius: Layout.BORDER_RADIUS.L
  },
  option: {
    fontFamily: "Roboto_400Regular",
    fontSize: Layout.FONT_SIZE.M,
    marginVertical: Layout.SPACING.S,
    textAlign: "center"
  },
  rowItemContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  iconText: {
    fontFamily: "Roboto_200ExtraLight",
    fontSize: Layout.FONT_SIZE.S,
    marginTop: Layout.SPACING.XS
  },
  closeButton: {
    position: "absolute",
    top: -10,
    right: -10,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    borderRadius: Layout.BORDER_RADIUS.ROUND,
    fontSize: 24,
    color: Colors.TEXT_PRIMARY,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold"
  }
});

export default styles;
