package model

import com.gu.contentapi.client.model.v1.{Content => ApiContent, ItemResponse}
import model.pressed.PressedContent
import services.FaciaContentConvert

object RelatedContentItem {
  def apply(content: ApiContent) : RelatedContentItem = {
    RelatedContentItem(Content(content), FaciaContentConvert.contentToFaciaContent(content))
  }
}

case class RelatedContentItem (
  content: ContentType,
  faciaContent: PressedContent
)

case class RelatedContent (items: Seq[RelatedContentItem]) {
  val hasStoryPackage: Boolean = items.nonEmpty
  val faciaItems: Seq[PressedContent] = items.map(_.faciaContent)
}

object StoryPackages {
  def apply(parent: ContentType, response: ItemResponse): RelatedContent = {
    RelatedContent(Nil: Seq[RelatedContentItem])
  }
}
