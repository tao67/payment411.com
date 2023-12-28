<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/opml">
		<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
			<head>
				<title><xsl:value-of select="head/title"/></title>
				<style type="text/css">
					body {
						background-color: #fefefe;
						padding: 2ex;
						font-family: 'Tahoma', sans-serif;
						font-size: 14pt;
					}
					h1,
					h2,
					h3,
					h4,
					h5,
					h6 {
						font-family: 'Tahoma', sans-serif;
						font-weight: 400;
					}
					h2 {
						font-size: 24pt;
					}
					h3 {
						font-size: 14pt;
					}
					dl dl {
						padding: 4ex;
						margin: 1ex;
						border: 1px dotted #5550ed;
					}
					dd {
						padding: 1ex;
					}
					.folder h3 {
						cursor: default;
					}
					.feed,
					.link a,
					.folder h3 {
						padding-left: 20px;
						background-repeat: no-repeat;
					}
					.link {
						padding-bottom: 0.5ex;
					}
					a {
						color: #5550ed;
						text-decoration: none;
					}				
					a:visited {
						color: #ed1980;				
					}
				</style>
			</head>
			<body>
				<h2><xsl:value-of select="head/title"/></h2>
				<h3><xsl:value-of select="head/dateCreated"/></h3>
				<dl>
					<xsl:apply-templates select="body/outline"/>
				</dl>
			</body>
		</html>
	</xsl:template>
	<xsl:template match="outline" xmlns="http://www.w3.org/1999/xhtml">
		<xsl:choose>
			<xsl:when test="@type">
				<xsl:choose>
					<xsl:when test="@xmlUrl">
						<dt class="link">
							<a href="{@htmlUrl}"><xsl:value-of select="@text"/></a>
						</dt>
						<dd>
							<a class="feed" href="{@xmlUrl}"><xsl:value-of select="@xmlUrl"/></a>
							<xsl:choose>
								<xsl:when test="@description != ''">
									<br /><br />
									<xsl:value-of select="@description"/>
								</xsl:when>
							</xsl:choose>
						</dd>
					</xsl:when>
					<xsl:otherwise>
						<dt class="link">
							<a href="{@url}"><xsl:value-of select="@text"/></a>
						</dt>
						<xsl:choose>
							<xsl:when test="@description != ''">
								<dd>
									<xsl:value-of select="@description"/>
								</dd>
							</xsl:when>
						</xsl:choose>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:otherwise>
				<dt class="folder">
					<h3>
						<xsl:value-of select="@title"/>
					</h3>
					<dl>
						<xsl:apply-templates select="outline"/>
					</dl>
				</dt>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>
